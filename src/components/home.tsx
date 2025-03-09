import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Users, Zap } from "lucide-react";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-background">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LangChain Orchestra</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary">
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </header>

      <main>
        <section className="container mx-auto py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build AI Agent Teams <br />
            <span className="text-primary">Visually</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Create, configure, and orchestrate teams of LangChain agents through
            an intuitive drag-and-drop canvas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/editor">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </section>

        <section id="features" className="bg-muted py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Visual Workflow Editor
                </h3>
                <p className="text-muted-foreground">
                  Drag and drop agents, tools, and data sources to create
                  complex workflows without coding.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Team Orchestration
                </h3>
                <p className="text-muted-foreground">
                  Define communication patterns and hierarchies between agents
                  to create effective teams.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  One-Click Deployment
                </h3>
                <p className="text-muted-foreground">
                  Deploy your agent teams as API endpoints with a single click
                  and monitor their performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Start building your first agent team in minutes.
          </p>
          <Button size="lg" asChild>
            <Link to="/editor">
              Launch Editor <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Layers className="h-5 w-5 text-primary" />
              <span className="font-semibold">LangChain Orchestra</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LangChain Orchestra. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
