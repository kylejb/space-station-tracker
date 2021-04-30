const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const Sidebar = () => (
    <section id="sidebar">
        <section id="intro">
        <header>
            <h2>ISS Tracker</h2>
            <p><a href="mailto:email@example.com">email@example.com</a></p>
        </header>
        </section>

        <section className="blurb">
        <h2>About</h2>

        <ul className="actions">
            <li>

            </li>
        </ul>
        </section>

        <section id="footer">
            <p className="copyright">Authors... </p>
        </section>
    </section>
);

export default Sidebar;
