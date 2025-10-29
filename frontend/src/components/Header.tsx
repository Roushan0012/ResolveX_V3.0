import { Leaf, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import AccessibilityControls from "@/components/AccessibilityControls";

const Header = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Report Waste", path: "/report-waste" },
    { name: "Water Testing", path: "/water-testing" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-base hover:opacity-80">
          <div className="rounded-full bg-primary p-2">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">SUDHAAR</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-base"
            >
              {link.name}
            </Link>
          ))}
          <AccessibilityControls />
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-medium text-muted-foreground hover:text-primary transition-base"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-2 mt-4">
                <AccessibilityControls />
                <Button variant="outline" className="flex-1">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
