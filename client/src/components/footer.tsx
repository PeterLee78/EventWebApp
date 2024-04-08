import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
{
  /* ini footer */
}
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-bold text-xl mb-5">Ticketing.com</h2>
          <div className="flex mt-4">
            <a href="#" className="mr-4 text-gray-300 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="mr-4 text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="mr-4 text-gray-300 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Product</h2>
          <ul>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Overview
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Customer stories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Integrations
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Security
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Resources</h2>
          <ul>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Guides & tutorials
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Help center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Whats new
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Company</h2>
          <ul>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Media kit
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact support
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-8 mt-8">
        <p>Copyright &copy; 2024 Ticketing.com All rights reserved.</p>
      </div>
    </footer>
  );
}
