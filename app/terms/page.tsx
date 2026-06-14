export const metadata = {
  title: "شروط الاستخدام | سيارتي",
};

export default function TermsPage() {
  return (
    <section className="container-app py-20 sm:py-24" dir="rtl">
      <div className="mx-auto max-w-3xl rounded-[40px] border border-border bg-card/75 p-8 shadow-[0_26px_80px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-10">
        <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
          شروط الاستخدام
        </h1>
        <p className="mt-4 text-base leading-8 text-muted">
          هذه صفحة شروط مبدئية لتوضيح استخدام المنصة. سيتم تحديثها عند إطلاق النسخة الرسمية.
        </p>
        <div className="mt-8 space-y-5 text-sm leading-8 text-foreground/80">
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">نطاق الخدمة</div>
            <p className="mt-2">
              سيارتي منصة رقمية لتجميع معلومات الصيانة والتوصيات والخدمات. تنفيذ الخدمات يتم عبر
              مزودين مستقلين وفق توفرهم.
            </p>
          </div>
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">الدقة والمسؤولية</div>
            <p className="mt-2">
              التوصيات مبنية على معلومات السيارة التي تدخلها. القرار النهائي ومسؤولية التنفيذ
              تعتمد على حالة المركبة وفحص المختص.
            </p>
          </div>
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">الاستخدام المقبول</div>
            <p className="mt-2">
              يُمنع إساءة استخدام المنصة أو محاولة الإضرار بالخدمة أو المستخدمين. سنضيف لاحقًا
              تفاصيل آلية الإبلاغ وإيقاف الحسابات عند الضرورة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

