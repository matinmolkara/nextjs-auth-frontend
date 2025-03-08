
import "../../styles/profile.css";
export default function ProfileLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
 
      {children}
    </section>
  );
}
