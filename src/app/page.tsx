export default function Page() {
  return (
    <main>
      <div style={{ padding: "20px", fontFamily: "Verdana, sans-serif" }}>
        <header>
          <h1 style={{ fontSize: "30px", color: "blueviolet" }}>About Me</h1>
          <hr />
        </header>

        <p>
          Hello! My name is <b>Wilbert Hernandez</b>. I'm a passionate Computer Science student at the University of Florida. I specialize in full-stack development and enjoy turning complex ideas into functional and polished web applications.
        </p>
        <p>
          I’ve led development efforts on multiple projects, including gaming infrastructure for the Reitz Union and UF’s first Minecraft server. I’ve also worked as an IT intern, earned security clearance, and love building communities through code.
        </p>
        <p>
          My interests include frontend design, backend systems, computer graphics, AI, and performance optimization. I’m a big fan of clean UI/UX, TypeScript, and platforms like Firebase and Vercel.
        </p>

        <h2>This is heading 2</h2>
        <h3>This is heading 3</h3>
        <h4>This is heading 4</h4>
        <h5>This is heading 5</h5>
        <h6>This is heading 6</h6>

        <p>
          <b>This text is bold. </b>
          <i>This text is italic. </i>
          <sub>This is subscripted text. </sub>
          <sup>This is superscripted text. </sup>
          <mark>This is highlighted using &lt;mark&gt;. </mark>
          <del>This is deleted text using &lt;del&gt;.</del>
        </p>

        <p>
          <font color="red">This is red text using font color.</font>
        </p>

        <p>
          <font size="6">This is font size 6.</font>
          <br />
          <font size="3">This is base font size.</font>
          <br />
          <font size="1">This is only 11px.</font>
        </p>

        <hr />

        <h2>Ordered HTML List</h2>
        <ol>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ol>

        <h2>Unordered HTML List</h2>
        <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul>

        <hr />

        <footer style={{ fontSize: "14px", color: "gray", marginTop: "40px" }}>
          &copy; 2025 Wilbert Hernandez — MustSolve Project for Module 2 Assignment
        </footer>
      </div>
    </main>
  );
}
