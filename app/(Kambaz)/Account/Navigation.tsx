import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link href="/kambaz/Signin"> Signin </Link> <br />
      <Link href="/kambaz/Signup"> Signup </Link> <br />
      <Link href="/kambaz/Profile"> Profile </Link> <br />
    </div>
  );
}
