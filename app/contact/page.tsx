import type { Metadata } from "next";

import ContactForm from "@/components/contact/contact-form";
import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";
import { contactDetails } from "@/constants/contact/contact.constants";

export const metadata: Metadata = {
  title: "Contact | Funiro",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact" />

      <div className="content-container">
        <div className="mt-14 mb-12 text-center md:mt-24 lg:mb-33">
          <h2 className="text-dark mb-2 text-4xl leading-normal font-semibold">
            Get In Touch With Us
          </h2>
          <p className="text-light mx-auto max-w-2xl leading-normal">
            For more information about our products and services, feel free to drop us an email. Our
            staff is always there to help you out. Do not hesitate!
          </p>
        </div>

        <section className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:gap-24">
          <div className="space-y-10">
            {contactDetails.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-5 md:gap-7">
                <Icon className="text-dark mt-1.5 size-6 shrink-0" />

                <div>
                  <h3 className="text-dark text-2xl leading-normal font-medium">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="text-dark leading-normal">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </section>
      </div>

      <FeaturesStrip />
    </>
  );
}
