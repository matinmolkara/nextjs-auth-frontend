import React from "react";
import styles from "../styles/components/Navbar.module.css";
import Link from "next/link";
const Navbar = () => {
  const dropdownData = [
    {
      title: "اکسسوری",
      sections: [
        {
          heading: "کمربند و ساسبند مردانه",
          links: [
            {
              label: "بندآویز شلوار",
              href: "/productlist?category=accessories&sub=brace-suspenders",
            },
            {
              label: "تسمه کمربند",
              href: "/productlist?category=accessories&sub=belt-strap",
            },
            {
              label: "ساسبند",
              href: "/productlist?category=accessories&sub=suspenders",
            },
            {
              label: "سگک کمربند",
              href: "/productlist?category=accessories&sub=buckle",
            },
            {
              label: "کمربند",
              href: "/productlist?category=accessories&sub=belt",
            },
          ],
        },
        {
          heading: "عینک آفتابی",
          links: [
            {
              label: "عینک آفتابی مردانه",
              href: "/productlist?category=sunglasses&sub=men",
            },
            {
              label: "عینک آفتابی زنانه",
              href: "/productlist?category=sunglasses&sub=women",
            },
            { label: "اسپرت", href: "#" },
            { label: "طبی", href: "#" },
          ],
        },
        {
          heading: "کلاه مردانه",
          links: [
            { label: "کلاه لبه دار", href: "#" },
            { label: "کلاه پشمی", href: "#" },
          ],
        },
        {
          heading: "کراوات و پاپیون مردانه",
          links: [
            { label: "کراوات مردانه", href: "#" },
            { label: "پاپیون", href: "#" },
            { label: "دستمال گردن", href: "#" },
          ],
        },
        {
          heading: "ساعت",
          links: [
            { label: "ساعت مردانه", href: "#" },
            { label: "ساعت زنانه", href: "#" },
            { label: "اسپرت", href: "#" },
          ],
        },
      ],
    },
    {
      title: "کفش",
      sections: [
        {
          heading: "کفش چرم",
          links: [
            {
              label: "کفش مردانه",
              href: "/productlist?category=shoes&sub=men",
            },
            {
              label: "کفش زنانه",
              href: "/productlist?category=shoes&sub=women",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className={`navbar ${styles.navbar}`}>
        <Link href="/" className={styles.active}>
          خانه
        </Link>
        <Link href="/contactus">تماس</Link>

        {dropdownData.map((dropdown, index) => (
          <div key={index} className={`dropdown ${styles.dropdown}`}>
            <button className={styles.dropbtn}>{dropdown.title}</button>
            <div className={styles.dropdownContent}>
              <div className="d-flex justify-content-start flex-wrap">
                {dropdown.sections.map((section, idx) => (
                  <div key={idx} className="">
                    <h6>{section.heading}</h6>
                    {section.links.map((link, linkIdx) => (
                      <Link key={linkIdx} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
