import Link from 'next/link'
export default function Custom404() {
  return ( 
  <div>
    <h1>صفحه مورد نظر پیدا نشد</h1>;
    <p>Could not find requested resource</p>
    <Link href="/">Return Home</Link>
  </div>
  )
 
}
