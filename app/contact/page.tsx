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
          <h2 className="text-dark text-heading mb-2 font-semibold">Get In Touch With Us</h2>
          <p className="text-light mx-auto max-w-2xl leading-normal">
            For more information about our products and services, feel free to drop us an email. Our
            staff is always there to help you out. Do not hesitate!
          </p>
        </div>

        <section className="flex flex-col gap-12 md:flex-row md:justify-around md:gap-10">
          <div className="space-y-10 md:shrink-0">
            {contactDetails.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex gap-5 md:gap-7">
                <Icon className="text-dark mt-1.5 size-6 shrink-0" />

                <div>
                  <h3 className="text-dark text-subheading font-bold">{title}</h3>
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
