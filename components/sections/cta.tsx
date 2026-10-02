import { Button } from "@/components/ui/button";

// Standard Google 4-color G icon — kept at natural size in the auth button.
// opacity-100 prevents the button's default 80% svg opacity from washing out
// the brand colors.
function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="opacity-100"
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.252-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908C16.658 12.015 17.64 9.707 17.64 9.2Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

// ─── CtaSection ───────────────────────────────────────────────────────────────

export function CtaSection() {
  return (
    <section aria-label="Get started" className="w-full bg-background">
      <div className="mx-auto max-w-[1200px] px-10 py-20 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
            Get started
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight text-foreground">
            Start simple. Grow from there.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Free for individuals. Built to scale with teams and organisations.
            Developer-ready when scheduling becomes part of your product.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
              render={<a href="https://app.cal.com/signup" />}
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              // biome-ignore lint/a11y/useAnchorContent: content is merged from Button children by Base UI render
              render={<a href="https://app.cal.com/signup" />}
            >
              Sign up with email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
