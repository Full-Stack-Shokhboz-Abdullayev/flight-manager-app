import './Footer.style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="content has-text-centered">
          <p>
            Made with enthusiasm by{' '}
            <strong>
              <a href="https://shox-pro.netlify.app" target={'_blank'} rel="noreferrer">
                Shokhboz Abdullaev
              </a>
            </strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
