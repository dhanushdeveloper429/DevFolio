export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p data-testid="footer-copyright">&copy; 2024 Senior Developer Portfolio. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
              data-testid="footer-privacy"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-primary transition-colors"
              data-testid="footer-terms"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
