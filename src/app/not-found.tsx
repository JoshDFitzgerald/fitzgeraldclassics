import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-[20px] py-[80px] text-center">
      <h1 className="font-serif text-[40px] font-bold md:text-[56px]">Page not found.</h1>
      <p className="mt-[16px] text-[18px] text-muted md:text-[22px]">(Error 404)</p>
      <p className="mt-[16px] max-w-[620px] text-[16px] md:text-[18px]">Double check the website address and retype it in the address bar—or return to the homepage.</p>
      <Button href="/" className="mt-[32px]">
        Back to Homepage
      </Button>
    </section>
  );
}
