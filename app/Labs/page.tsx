import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
    <div className="mb-6">
        <h2>Student Info</h2>
        <p><strong>Name:</strong>Sruthi Annavarapu</p>
        <p><strong>Section:</strong> CS5610 18616</p>
        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/asruthi17"
            target="_blank"
            rel="noopener noreferrer"
          >
           https://github.com/asruthi17
          </a>
        </p>
      </div>

     <h1>Labs</h1>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
        <Link href="/" id="wd-kambaz-link">
        Kambaz
        </Link>
       </li>
      <li>
        <Link href="https://github.com/asruthi17" id="wd-github-link">
        Click here for my Github.
        </Link>
       </li>
     </ul>
   </div>
);}

