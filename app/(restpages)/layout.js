import BreadCrumb from "@/components/BreadCrumb";

import "@/styles/contact.css"
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
        <BreadCrumb />
      {children}
    </section>
  );
}
