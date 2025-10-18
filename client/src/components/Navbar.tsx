type Page = "home" | "about" | "shop" | "contact";

interface ItemProps {
  label: string;
  id: Page;
  current: Page;
  onClick: (page: Page) => void;
}

const Item = ({ label, id, current, onClick }: ItemProps) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(id); }}
    className={current === id ? "active" : ""}
    aria-current={current === id ? "page" : undefined}
  >
    {label}
  </a>
);

interface NavbarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  return (
    <>
      <div className="brand">
        <span className="brand-logo" aria-hidden="true"></span>
        <span>PlamShop</span>
      </div>

      <div className="nav-links" role="navigation" aria-label="Primary">
        <Item id="home" label="Home" current={current} onClick={onNavigate} />
        <Item id="about" label="About" current={current} onClick={onNavigate} />
        <Item id="shop" label="Shop" current={current} onClick={onNavigate} />
        <Item id="contact" label="Contact" current={current} onClick={onNavigate} />
      </div>
    </>
  );
}
