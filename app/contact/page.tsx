// app/contact/page.tsx
// import ContactInfo from "@/components/ContactInfo"; // Static part (can be server component)

import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contactInfo";
import { createClient } from '@/utils/supabase/server'

// import ContactForm from "@/components/ContactForm"; // Interactive part (client component)

export default async function ContactPage() {
    const supabase = await createClient();
    const user = (await supabase.auth.getUser()).data.user;
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <ContactInfo />
          <ContactForm email={user?.email} phone={user?.phone}  />
        </div>
      </div>
    </section>
  );
}