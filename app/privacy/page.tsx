export const metadata = {
  title: "سياسة الخصوصية | سيارتي",
};

export default function PrivacyPage() {
  return (
    <section className="container-app py-20 sm:py-24" dir="rtl">
      <div className="mx-auto max-w-3xl rounded-[40px] border border-border bg-card/75 p-8 shadow-[0_26px_80px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-10">
        <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
          سياسة الخصوصية
        </h1>
        <p className="mt-4 text-base leading-8 text-muted">
          نحن في سيارتي نعامل بياناتك باحترام. هذه الصفحة هي نسخة مبدئية قابلة للتحديث عند إطلاق
          السياسات الرسمية.
        </p>
        <div className="mt-8 space-y-5 text-sm leading-8 text-foreground/80">
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">ما الذي نجمعه؟</div>
            <p className="mt-2">
              بيانات حسابك، ومعلومات السيارة التي تضيفها، وسجل الطلبات داخل المنصة لتحسين التجربة
              وتقديم توصيات أدق.
            </p>
          </div>
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">كيف نستخدم البيانات؟</div>
            <p className="mt-2">
              لتقديم لوحة صيانة واضحة، وتوصيات زيوت، وربطك بخدمات موثوقة، وتحسين أداء المنصة.
            </p>
          </div>
          <div className="rounded-[28px] border border-border bg-card/70 p-6">
            <div className="text-lg font-semibold text-foreground">التحكم والشفافية</div>
            <p className="mt-2">
              يمكنك تحديث بيانات سيارتك أو تعديلها. عند توفر مركز تحكم للخصوصية سيتم وضعه هنا.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

