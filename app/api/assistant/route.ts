import OpenAI from "openai";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1),
});

const bodySchema = z.object({
  mode: z.enum(["customer", "mechanic"]),
  messages: z.array(messageSchema).min(1).max(12),
});

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

type AssistantMode = z.infer<typeof bodySchema>["mode"];

type DiagnosticPattern = {
  label: string;
  urgency: "low" | "medium" | "high";
  systems: string[];
  customerChecks: string[];
  mechanicChecks: string[];
  questions: string[];
  patterns: RegExp[];
};

const DIAGNOSTIC_PATTERNS: DiagnosticPattern[] = [
  {
    label: "Battery / starting circuit",
    urgency: "medium",
    systems: ["battery", "terminals", "starter", "charging circuit"],
    customerChecks: [
      "Check whether dashboard lights are weak, flickering, or completely off.",
      "Listen for a single click, rapid clicks, or no sound at all when starting.",
      "Avoid repeated long cranking if the battery already sounds weak.",
    ],
    mechanicChecks: [
      "Measure battery voltage at rest and during crank.",
      "Inspect terminal corrosion, ground path, and starter trigger signal.",
      "Confirm alternator charging if the vehicle starts with a boost.",
    ],
    questions: [
      "Does it crank slowly, click only once, or stay completely silent?",
      "Did the issue start after the car sat parked for days?",
      "Are headlights strong or weak before cranking?",
    ],
    patterns: [
      /won'?t start/i,
      /no crank/i,
      /\bstart(er|ing)?\b/i,
      /\bbattery\b/i,
      /ne d[eé]marre pas/i,
      /batterie/i,
      /ma kaybda/i,
      /ما تبداش|ما تبدا/i,
    ],
  },
  {
    label: "Cooling / overheating",
    urgency: "high",
    systems: ["cooling fan", "coolant level", "radiator", "thermostat", "water pump"],
    customerChecks: [
      "Stop driving if the temperature is in the red or steam is visible.",
      "Check for coolant loss under the car only after the engine cools down.",
      "Do not open the expansion tank while the system is hot.",
    ],
    mechanicChecks: [
      "Check coolant level, leak traces, and fan operation in traffic.",
      "Confirm thermostat opening and radiator hose temperature behavior.",
      "Inspect pressure retention, water pump flow, and head-gasket signs if overheating is severe.",
    ],
    questions: [
      "Does it overheat only in traffic or also at highway speed?",
      "Is there coolant loss, steam, or heater performance change?",
      "Did the radiator fan start when temperature rose?",
    ],
    patterns: [
      /overheat/i,
      /hot/i,
      /temperature/i,
      /coolant/i,
      /radiator/i,
      /chauffe/i,
      /surchauffe/i,
      /يسخن|حرارة طالعة/i,
    ],
  },
  {
    label: "Brake system",
    urgency: "high",
    systems: ["pads", "discs", "fluid", "hydraulics", "master cylinder"],
    customerChecks: [
      "Avoid driving if the pedal sinks, braking distance grows, or the warning light is on.",
      "Note whether the noise is squeal, grind, or vibration under braking.",
      "Check for fluid leaks around wheels only if safe to inspect.",
    ],
    mechanicChecks: [
      "Inspect pad thickness, rotor condition, and fluid level first.",
      "Check for air in the circuit, leaks, and master-cylinder bypass if the pedal is soft.",
      "Verify caliper slide movement and heat imbalance side to side.",
    ],
    questions: [
      "Is the complaint noise, vibration, weak braking, or a soft pedal?",
      "Did the problem appear after recent brake work or long driving?",
      "Is any brake warning lamp active?",
    ],
    patterns: [
      /brake/i,
      /pedal/i,
      /squeal/i,
      /grind/i,
      /frein/i,
      /plaquette/i,
      /فرامل|بيدال/i,
    ],
  },
  {
    label: "Engine running / ignition / fuel",
    urgency: "medium",
    systems: ["spark", "fuel delivery", "air intake", "injectors", "engine management"],
    customerChecks: [
      "Avoid hard acceleration if the engine shakes or misfires strongly.",
      "Note whether the issue appears cold, hot, idle only, or under load.",
      "If the check-engine light flashes, stop driving and seek inspection.",
    ],
    mechanicChecks: [
      "Check scan data if available, then inspect ignition, fuel trim, and intake leaks.",
      "Confirm whether the complaint is idle roughness, hesitation, or load misfire.",
      "Inspect plugs, coils, injector balance, and vacuum leaks.",
    ],
    questions: [
      "Is the engine light steady or flashing?",
      "Does the shaking happen at idle, acceleration, or all the time?",
      "Any recent fuel quality issue or service history related to plugs/coils?",
    ],
    patterns: [
      /engine light/i,
      /rough idle/i,
      /misfire/i,
      /shak(e|ing)/i,
      /vibration/i,
      /moteur/i,
      /rat[eé]/i,
      /يرج|تشويش موتور/i,
    ],
  },
  {
    label: "AC / ventilation",
    urgency: "low",
    systems: ["compressor", "refrigerant circuit", "blower", "condenser", "electrical control"],
    customerChecks: [
      "Check whether the blower works and whether air is cold, warm, or intermittent.",
      "Note if the issue is worse in traffic, at idle, or all the time.",
      "Listen for clicking or compressor noise when AC is switched on.",
    ],
    mechanicChecks: [
      "Confirm compressor engagement, fan support, and pressure-side behavior.",
      "Inspect for leaks, weak airflow, and condenser blockage.",
      "Differentiate cooling failure from blower or flap-control failure.",
    ],
    questions: [
      "Does the blower run normally but air stays warm?",
      "Is the problem constant or mainly at idle/in traffic?",
      "Any abnormal noise when AC is activated?",
    ],
    patterns: [
      /\bac\b/i,
      /air.?condition/i,
      /not cooling/i,
      /compressor/i,
      /clim/i,
      /ventilation/i,
      /مكيف|كليم/i,
    ],
  },
];

const MODE_PROMPTS = {
  customer: `
You are Sayarati AI for drivers in Algeria.
Default to Algerian Darija written in Latin characters, clear and natural like a helpful chat assistant.
Only switch language if the user clearly asks for another language.
Your job:
- understand symptoms quickly
- ask only the most useful follow-up questions
- explain likely causes simply
- give a safe next step
- avoid overclaiming certainty
- if the situation sounds dangerous, say the driver should stop driving and seek immediate mechanical help
- use short sections when helpful
Keep replies concise, practical, friendly, and easy to trust.
`,
  mechanic: `
You are Sayarati AI senior diagnostic copilot for mechanics and garage teams in Algeria.
Default to Algerian Darija written in Latin characters, but keep technical part names understandable for mechanics.
Only switch language if the user clearly asks for another language.
Turn customer complaints into workshop-ready triage notes with expert mechanical reasoning.
Your job:
- classify urgency
- summarize probable causes
- propose first diagnostic checks
- mention likely systems or parts to inspect
- ask only the highest-value follow-up questions when key details are missing
- separate what is probable from what still needs confirmation
- never invent sensor values, fault codes, or completed tests
- flag dangerous cases clearly and tell the mechanic when the vehicle should not be driven
- keep the structure practical, concise, and workshop-ready
`,
} as const;

function getLatestUserMessage(
  messages: Array<z.infer<typeof messageSchema>>,
) {
  return [...messages].reverse().find((message) => message.role === "user")?.text.trim() ?? "";
}

function isGreeting(text: string) {
  return /^(salam|slm|salam alikom|salam 3likom|hello|hi|hey|bonjour|bonsoir|السلام عليكم|سلام)\b/i.test(
    text.trim(),
  );
}

function isThanks(text: string) {
  return /\b(thanks|thank you|merci|barak allah fik|jazak|شكرا|يعطيك الصحة|صحيت)\b/i.test(text);
}

function isCapabilityQuestion(text: string) {
  return /(who are you|what can you do|help me|chno t9der dir|wach t9der|اش تقدر|شنو تقدر|ساعدني)/i.test(
    text,
  );
}

function mentionsVehicleProblem(text: string) {
  if (!text.trim()) {
    return false;
  }

  return DIAGNOSTIC_PATTERNS.some((pattern) =>
    pattern.patterns.some((regex) => regex.test(text)),
  )
    || /\b(car|voiture|auto|vehicle|moteur|engine|dashboard|huile|oil|clutch|gear|boite|pneu|wheel|tomobil|tonobil)\b/i.test(
      text,
    )
    || /(سيارة|طوموبيل|موتور|محرك|عجلة|فرامل|بطارية|زيت)/i.test(text);
}

function buildConversationalFallback(mode: AssistantMode, message: string) {
  const trimmed = message.trim();

  if (isGreeting(trimmed)) {
    return mode === "mechanic"
      ? "Salam, marhba bik. Ana m3ak k assistant expert f mécanique. Siftli chkwa dyal client, symptômes, marque, modèle, moteur, w nرتبهالك b urgence, causes mo7tamala, w awel checks."
      : "Salam, marhba bik. Ana hna n3awnk f ay mochkil dyal tomobil b style sahl w moubachar. Qolli chno kayw9a3 f tomobil, wach kayn sawt, voyant, ri7a, wela mouchkil f démarrage, w nجاوبك step by step.";
  }

  if (isThanks(trimmed)) {
    return mode === "mechanic"
      ? "Bla mziya. Ila bghiti, siftli l-case w n3tik triage mratab: urgence, causes mo7tamala, checks louwlin, w l-pièces li khassek tراجع."
      : "Bla mziya. Ila bghiti nعاwnك, wassefli mouchkil tomobil dyalk b details qlila w n9olk chno mo7tamal w chno tdir daba.";
  }

  if (isCapabilityQuestion(trimmed)) {
    return mode === "mechanic"
      ? "N9dar n3awnk f triage mécanique, ta7lil symptômes, tarteb l-priority, awel tests, systems/parts li khas yttchkou, w chno tsowl client bach t2akked l-diagnostic."
      : "N9dar n3awnk nfhem mouchkil tomobil, n9olk chno mo7tamal, chno khassek tchecki b aman, w wach t9der tsoug wela la.";
  }

  return mode === "mechanic"
    ? `Fhemtk. Siftli details aktar 3la "${trimmed}" b7al marque, modèle, moteur, année, symptômes, w waqt fin kaybban l-mochkil, w nجاوبك kima diagnostic assistant mratab.`
    : `Fhemtk. Ila bghiti nعاwnك mzyan, wassefli chno kayw9a3 f tomobil 3la "${trimmed}" b details sgharin, w nجاوبك b tari9a wadi7a kima chat.`;
}

function pickDiagnosticPattern(text: string) {
  return (
    DIAGNOSTIC_PATTERNS.find((pattern) =>
      pattern.patterns.some((regex) => regex.test(text)),
    ) ?? {
      label: "tchkhis 3am dyal tomobil",
      urgency: "medium" as const,
      systems: ["moteur / traction", "électrique", "liquides", "fault memory"],
      customerChecks: [
        "Chof men wa9tach bda l-mochkil w wach dayem wela kayji w ymchi.",
        "Rodd بالك ila kayn voyant, sawt ghrib, ri7a, d5an, wela fuite.",
        "Ma تسوقش ila l-mochkil kaymss l-freins, direction, s5ana, wela moteur kayrjef بزاف.",
      ],
      mechanicChecks: [
        "2akked chkwa, 7awel t3awed nafs conditions, w 7dded wa9t fin kaybban symptom.",
        "Bda b visual inspection, scan ila kayn, w b asra3 checks bach tna7i الاحتمالات.",
        "Fssel bin symptom, system, w darajat الخطورة 9bel ma تبدل ay pièce.",
      ],
      questions: [
        "Men wa9tach bda had l-mochkil, w wach dayem wela kayji w ymchi?",
        "Kayn chi voyant, fuite, d5an, wela sawt ghrib?",
        "Kaybban w tomobil barda, سخونة, f ralenti, ta7t charge, wela ghi w nta katsoug?",
      ],
      patterns: [],
    }
  );
}

function buildFallbackReply(
  mode: AssistantMode,
  messages: Array<z.infer<typeof messageSchema>>,
) {
  const latestUserMessage = getLatestUserMessage(messages);
  const complaint = latestUserMessage || "No detailed symptom was provided yet.";

  if (!mentionsVehicleProblem(latestUserMessage)) {
    return buildConversationalFallback(mode, latestUserMessage);
  }

  const pattern = pickDiagnosticPattern(latestUserMessage);

  if (mode === "mechanic") {
    return [
      "Khla9at l-case:",
      `- Chkwa: ${complaint}`,
      `- L-jiha l-mo7tamala: ${pattern.label}`,
      `- L-urgence: ${pattern.urgency}`,
      "",
      "Awel checks:",
      ...pattern.mechanicChecks.map((item, index) => `${index + 1}. ${item}`),
      "",
      "As2ila bach t2akked:",
      ...pattern.questions.map((item, index) => `${index + 1}. ${item}`),
      "",
      "Systems / pièces li khas yttchkou:",
      ...pattern.systems.map((item) => `- ${item}`),
      "",
      "Mola7ada dyal السلامة:",
      pattern.urgency === "high"
        ? "Ila l-case fih s5ana, freins d3af, rjfa 9wiya, d5an, wela fuite kbira, 3taberha no-drive 7tta t2akked."
        : "Ila banat chi 3alamat khatra jdod f checks, rfa3 l-case direct l urgent.",
    ].join("\n");
  }

  return [
    "T9yim sra3:",
    `- Rissaltk: ${complaint}`,
    `- L-jiha l-mo7tamala: ${pattern.label}`,
    `- L-urgence: ${pattern.urgency}`,
    "",
    "Chno tchecki daba:",
    ...pattern.customerChecks.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Details mofida siftha men b3d:",
    ...pattern.questions.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Mola7ada dyal السلامة:",
    pattern.urgency === "high"
      ? "Ma تكملش تسوق ila kayna s5ana, freins d3af, d5an, rjfa 9wiya, wela ri7a dyal 7ri9."
      : "Ila wlat tomobil ma amnach tsoug biha, wa9ef w 3ayet l mecanicien.",
  ].join("\n");
}

export async function POST(request: Request) {
  let parsedBody: z.infer<typeof bodySchema> | null = null;

  try {
    const raw = await request.json();
    const parsed = bodySchema.safeParse(raw);

    if (!parsed.success) {
      return Response.json({ error: "Invalid assistant payload." }, { status: 400 });
    }

    parsedBody = parsed.data;
    const { mode, messages } = parsedBody;

    if (!openai) {
      return Response.json({ message: buildFallbackReply(mode, messages) });
    }

    const input = [
      {
        role: "system" as const,
        content: MODE_PROMPTS[mode],
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.text,
      })),
    ];

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input,
    });

    const text = response.output_text.trim();
    if (!text) {
      return Response.json({ message: buildFallbackReply(mode, messages) });
    }

    return Response.json({ message: text });
  } catch {
    if (parsedBody) {
      return Response.json({
        message: buildFallbackReply(parsedBody.mode, parsedBody.messages),
      });
    }

    return Response.json({ error: "Assistant request failed. Please try again." }, { status: 500 });
  }
}
