"use client";

import { useMemo, useRef, useState } from "react";
import { Bot, History, LoaderCircle, Mic, MicOff, MessageSquarePlus, Send, User, Wrench } from "lucide-react";

type Mode = "customer" | "mechanic";
type Msg = { id: string; role: "user" | "assistant"; text: string; badge?: string };
type StoredMessage = { role: "user" | "assistant"; text: string };
type StoredConversation = {
  id: string;
  mode: Mode;
  title: string;
  preview: string | null;
  messages: StoredMessage[];
  updated_at: string;
};
export type AssistantStoredConversation = StoredConversation;
type ModeContent = {
  label: string;
  title: string;
  subtitle: string;
  helper: string;
  placeholder: string;
  badge: string;
  opener: string;
  response: (message: string) => string;
};

type SpeechRecognitionResultLike = {
  0: { transcript: string };
  isFinal: boolean;
  length: number;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: SpeechRecognitionResultLike[];
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const MODE_CONTENT: Record<Mode, ModeContent> = {
  customer: {
    label: "وضع الزبون",
    title: "مساعد ذكي مبسّط للزبون",
    subtitle: "اشرح الأعراض أو المشكلة، وخذ تشخيصًا أوليًا واضحًا والخطوة التالية بدون تعقيد.",
    helper: "مناسب للزبون قبل الحجز أو قبل الذهاب إلى الميكانيكي.",
    placeholder: "اكتب المشكلة: صوت، ضوء المحرك، اهتزاز، سخونة، صعوبة تشغيل...",
    badge: "وضع الزبون",
    opener:
      "أهلاً بك. اكتب ما الذي يحدث في السيارة وسأحوّل الوصف إلى تشخيص أولي منظم: الأسباب المحتملة، مستوى الاستعجال، وما الذي ينبغي فعله بعد ذلك.",
    response: (message) =>
      `تم. بالنسبة إلى "${message}" سأرتب الحالة لك بشكل واضح: متى بدأت، هل توجد أضواء تحذير، ما الأسباب المحتملة، وما هي الخطوة الأكثر أمانًا الآن.`,
  },
  mechanic: {
    label: "وضع الميكانيكي",
    title: "مساعد ذكي للميكانيكي والورشة",
    subtitle: "حوّل شكوى العميل إلى تشخيص أولي، نقاط فحص، وأولوية التدخل بشكل أسرع.",
    helper: "مناسب للميكانيكي الذي يريد فرز الحالات وتوجيه الفحص بسرعة.",
    placeholder: "ألصق شكوى العميل أو الأعراض أو الكيلومترات أو ملاحظات الفحص...",
    badge: "وضع الميكانيكي",
    opener:
      "واجهة الميكانيكي جاهزة. أرسل شكوى العميل أو وصف الحالة وسأرتبها كملف تشخيص أولي: الاستعجال، الأسباب المحتملة، أول الفحوصات، الأنظمة الواجب فحصها، والأسئلة المكملة.",
    response: (message) =>
      `تم استلام الحالة. بالنسبة إلى "${message}" سأرتب الأولوية، أحدد أسرع الفحوصات الأولية، وأذكر الأنظمة أو القطع الأكثر احتمالًا في تقرير واضح للميكانيكي.`,
  },
};

const QUICK_PROMPTS: Record<Mode, string[]> = {
  customer: [
    "السيارة لا تشتغل صباحًا",
    "ظهر ضوء المحرك فجأة",
    "أسمع صوتًا عند الفرامل",
    "السيارة تهتز عند السرعة",
  ],
  mechanic: [
    "رتبلي تشخيص أولي لهذه الحالة",
    "ما أول الفحوصات التي أبدأ بها؟",
    "حول الشكوى إلى تقرير ورشة",
    "ما القطع الأكثر احتمالًا لهذا العطل؟",
  ],
};

function createOpeningMessage(mode: Mode): Msg {
  return {
    id: `${mode}-welcome`,
    role: "assistant",
    text: MODE_CONTENT[mode].opener,
    badge: MODE_CONTENT[mode].badge,
  };
}

function getConversationTitle(messages: StoredMessage[], mode: Mode) {
  const firstUser = messages.find((message) => message.role === "user")?.text?.trim();
  if (!firstUser) {
    return mode === "mechanic" ? "تشخيص ميكانيكي" : "استفسار زبون";
  }

  return firstUser.slice(0, 60);
}

function getConversationPreview(messages: StoredMessage[]) {
  const lastMeaningful = [...messages]
    .reverse()
    .find((message) => message.text.trim().length > 0);

  return lastMeaningful?.text.slice(0, 140) ?? "";
}

function toStoredMessages(messages: Msg[]): StoredMessage[] {
  return messages.map(({ role, text }) => ({ role, text }));
}

function Bubble({ role, text, badge }: Msg) {
  const isUser = role === "user";

  return (
    <div className={["flex gap-3", isUser ? "justify-end" : "justify-start"].join(" ")}>
      {!isUser ? (
        <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card">
          <Bot className="h-4 w-4 text-primary" aria-hidden />
        </span>
      ) : null}
      <div
        className={[
          "max-w-[780px] rounded-[28px] px-5 py-4 shadow-[0_16px_45px_rgba(2,6,23,0.08)] ring-1",
          isUser
            ? "bg-foreground text-background ring-foreground/10"
            : "bg-background/92 text-foreground ring-border/60",
        ].join(" ")}
      >
        {badge ? (
          <div className="mb-3 inline-flex rounded-full border border-border/70 bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            {badge}
          </div>
        ) : null}
        <div className={["text-[15px] leading-8", isUser ? "text-background" : "text-foreground"].join(" ")}>
          {text}
        </div>
      </div>
      {isUser ? (
        <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card">
          <User className="h-4 w-4 text-foreground" aria-hidden />
        </span>
      ) : null}
    </div>
  );
}

export default function AssistantClient({
  initialMode = "customer",
  initialHistory = [],
  canPersistHistory = false,
}: {
  initialMode?: Mode;
  initialHistory?: StoredConversation[];
  canPersistHistory?: boolean;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>(() => [createOpeningMessage(initialMode)]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState<StoredConversation[]>(initialHistory);
  const [isHistoryLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [voiceUnavailable, setVoiceUnavailable] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(1);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const active = useMemo(() => MODE_CONTENT[mode], [mode]);

  const scrollToBottom = () => {
    queueMicrotask(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const nextId = (suffix: string) => {
    const id = idRef.current;
    idRef.current += 1;
    return `${suffix}-${id}`;
  };

  const hydrateMessages = (messages: StoredMessage[], conversationMode: Mode) =>
    messages.map((message) => ({
      id: nextId(message.role),
      role: message.role,
      text: message.text,
      badge: message.role === "assistant" ? MODE_CONTENT[conversationMode].badge : undefined,
    }));

  const saveConversation = async (nextMessages: Msg[], nextMode: Mode, nextConversationId?: string | null) => {
    if (!canPersistHistory) return;

    const storedMessages = toStoredMessages(nextMessages);
    if (storedMessages.length < 2) return;

    const response = await fetch("/api/assistant/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: nextConversationId ?? conversationId ?? undefined,
        mode: nextMode,
        title: getConversationTitle(storedMessages, nextMode),
        preview: getConversationPreview(storedMessages),
        messages: storedMessages,
      }),
    });

    const payload = (await response.json()) as {
      conversation?: StoredConversation;
      error?: string;
    };

    if (!response.ok || !payload.conversation) {
      throw new Error(payload.error || "Failed to save conversation.");
    }

    setConversationId(payload.conversation.id);
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== payload.conversation?.id);
      return [payload.conversation!, ...filtered].slice(0, 8);
    });
  };

  const openConversation = (conversation: StoredConversation) => {
    setMode(conversation.mode);
    setConversationId(conversation.id);
    setMsgs(hydrateMessages(conversation.messages, conversation.mode));
    setInput("");
    setIsListening(false);
    recognitionRef.current?.stop();
    scrollToBottom();
  };

  const startNewConversation = (nextMode: Mode) => {
    setMode(nextMode);
    setConversationId(null);
    setMsgs([createOpeningMessage(nextMode)]);
    setInput("");
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  const toggleVoice = () => {
    if (isLoading || typeof window === "undefined") return;

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognitionCtor = (
      window as typeof window & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      }
    ).SpeechRecognition ??
      (
        window as typeof window & {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).webkitSpeechRecognition;

    if (!recognitionCtor) {
      setVoiceUnavailable(true);
      return;
    }

    const recognition = new recognitionCtor();
    recognition.lang = "ar-DZ";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      setInput(transcript.trim());
    };
    recognition.onerror = () => {
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setVoiceUnavailable(false);
    setIsListening(true);
    recognition.start();
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Msg = { id: nextId("user"), role: "user", text: trimmed };
    const baseConversation = [...msgs, userMessage];
    const conversation = baseConversation.map(({ role, text: messageText }) => ({
      role,
      text: messageText,
    }));

    setMsgs((prev) => [...prev, userMessage]);
    setInput("");
    scrollToBottom();

    setIsLoading(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: conversation,
        }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "المساعد غير متاح حاليًا.");
      }

      const assistantMessage: Msg = {
        id: nextId("assistant"),
        role: "assistant",
        text: payload.message?.trim() || active.response(trimmed),
        badge: active.badge,
      };
      const nextMessages = [...baseConversation, assistantMessage];

      setMsgs(nextMessages);
      await saveConversation(nextMessages, mode);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "الاتصال بالمساعد غير جاهز الآن.";

      const errorMessage: Msg = {
        id: nextId("error"),
        role: "assistant",
        text: `${message} يمكنك المتابعة لاحقًا، والواجهة ما تزال جاهزة للاستخدام عند تفعيل الربط الكامل.`,
        badge: "حالة الاتصال",
      };
      const nextMessages = [...baseConversation, errorMessage];

      setMsgs(nextMessages);
      try {
        await saveConversation(nextMessages, mode);
      } catch {
        // Keep the local chat even if persistence fails.
      }
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-[32px] border border-border/70 bg-background/85 p-5 shadow-[0_18px_45px_rgba(2,6,23,0.06)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-card">
              <Bot className="h-5 w-5 text-primary" aria-hidden />
            </span>
            <div>
              <div className="text-base font-semibold">المساعد الذكي</div>
              <div className="text-sm text-muted">سريع، واضح، وسهل الاستخدام</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {(["customer", "mechanic"] as Mode[]).map((item) => {
              const itemContent = MODE_CONTENT[item];
              const activeMode = item === mode;
              const Icon = item === "customer" ? User : Wrench;

              return (
                <button
                  key={item}
                  type="button"
                  className={[
                    "rounded-[24px] border px-4 py-4 text-right transition",
                    activeMode
                      ? "border-foreground bg-foreground text-background shadow-[0_18px_45px_rgba(2,6,23,0.12)]"
                      : "border-border bg-card hover:bg-card-2",
                  ].join(" ")}
                  onClick={() => startNewConversation(item)}
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "inline-flex h-10 w-10 items-center justify-center rounded-full border",
                        activeMode ? "border-white/15 bg-white/10" : "border-border bg-background",
                      ].join(" ")}
                    >
                      <Icon
                        className={["h-4 w-4", activeMode ? "text-background" : "text-foreground"].join(" ")}
                        aria-hidden
                      />
                    </span>
                    <div>
                      <div className={["text-sm font-semibold", activeMode ? "text-background" : "text-foreground"].join(" ")}>
                        {itemContent.label}
                      </div>
                      <div className={["text-xs", activeMode ? "text-background/70" : "text-muted"].join(" ")}>
                        {itemContent.helper}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[22px] border border-border bg-card px-4 py-3 text-sm font-semibold transition hover:bg-card-2"
            onClick={() => startNewConversation(mode)}
          >
            <MessageSquarePlus className="h-4 w-4" aria-hidden />
            محادثة جديدة
          </button>
        </div>

        <div className="rounded-[32px] border border-border/70 bg-background/85 p-5 shadow-[0_18px_45px_rgba(2,6,23,0.06)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card">
              <History className="h-4 w-4 text-foreground" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-semibold">سجل المحادثات</div>
              <div className="text-xs text-muted">آخر المحادثات المحفوظة</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {!canPersistHistory ? (
              <div className="rounded-[22px] border border-dashed border-border px-4 py-4 text-sm text-muted">
                سجّل الدخول حتى يتم حفظ المحادثات تلقائيًا.
              </div>
            ) : isHistoryLoading ? (
              <div className="rounded-[22px] border border-dashed border-border px-4 py-4 text-sm text-muted">
                جارٍ التحميل...
              </div>
            ) : history.length === 0 ? (
              <div className="rounded-[22px] border border-dashed border-border px-4 py-4 text-sm text-muted">
                لا توجد محادثات محفوظة بعد.
              </div>
            ) : (
              history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "w-full rounded-[22px] border px-4 py-3 text-right transition",
                    item.id === conversationId ? "border-primary bg-primary/8" : "border-border bg-card hover:bg-card-2",
                  ].join(" ")}
                  onClick={() => openConversation(item)}
                >
                  <div className="truncate text-sm font-semibold">{item.title}</div>
                  <div className="mt-1 line-clamp-2 text-xs leading-6 text-muted">
                    {item.preview || "محادثة محفوظة"}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      <section className="min-w-0">
        <div className="overflow-hidden rounded-[36px] border border-border/70 bg-background/88 shadow-[0_24px_70px_rgba(2,6,23,0.08)] backdrop-blur">
          <div className="border-b border-border/70 px-5 py-5 sm:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {active.badge}
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{active.title}</h2>
                <p className="mt-2 text-base leading-8 text-muted">{active.subtitle}</p>
              </div>
              <div className="text-sm text-muted">{canPersistHistory ? "حفظ المحادثات مفعل" : "وضع الضيف"}</div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {QUICK_PROMPTS[mode].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-border bg-card px-3 py-2 text-xs text-muted transition hover:border-primary/25 hover:text-foreground"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={listRef}
            className="max-h-[58vh] min-h-[52vh] space-y-5 overflow-auto px-5 py-6 sm:px-8"
          >
            {msgs.map((m) => (
              <div
                key={m.id}
              >
                <Bubble {...m} />
              </div>
            ))}
          </div>

          <div className="border-t border-border/70 bg-card/40 px-5 py-5 sm:px-8">
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
            >
              <div className="rounded-[30px] border border-border bg-background p-2 shadow-[0_12px_35px_rgba(2,6,23,0.04)]">
                <div className="flex items-end gap-2">
                  <textarea
                    className="min-h-[76px] flex-1 resize-none bg-transparent px-4 py-3 text-base outline-none placeholder:text-muted"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={active.placeholder}
                    aria-label="رسالة"
                    disabled={isLoading}
                    rows={3}
                  />
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className={[
                        "inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card transition hover:bg-card-2",
                        isListening ? "border-primary bg-primary/10 text-foreground" : "",
                      ].join(" ")}
                      onClick={toggleVoice}
                      disabled={isLoading}
                      aria-label="الإدخال الصوتي"
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" aria-hidden />
                      ) : (
                        <Mic className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-foreground px-5 text-background transition hover:opacity-90 disabled:opacity-60"
                      aria-label="إرسال"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Send className="h-4 w-4" aria-hidden />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span>
                {isListening
                  ? "جارٍ الاستماع الآن..."
                  : voiceUnavailable
                    ? "الميكروفون غير مدعوم في هذا المتصفح."
                    : "يمكنك الكتابة أو استخدام الميكروفون."}
              </span>
              <span>واجهة مبسطة للزبون والميكانيكي</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
