"use client";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Clock,
  Globe,
  Menu,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Automação Inteligente",
      description:
        "Configure fluxos de trabalho automatizados que se adaptam às suas necessidades com IA avançada",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description:
        "Seus dados protegidos com criptografia de ponta e conformidade LGPD e SOC 2",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Analytics em Tempo Real",
      description:
        "Monitore performance e otimize processos com dashboards intuitivos e insights preditivos",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Colaboração em Equipe",
      description:
        "Trabalhe em conjunto com ferramentas de colaboração integradas e comunicação em tempo real",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: CheckCircle,
      title: "Integrações Nativas",
      description:
        "Conecte-se com mais de 500+ ferramentas populares sem complicação e configuração zero",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Star,
      title: "Suporte Premium",
      description:
        "Atendimento especializado 24/7 com time dedicado para garantir seu sucesso",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Maria Costa",
      role: "CEO, TechStart",
      content:
        "O FlowPro revolucionou nossa operação. Economizamos 15 horas por semana em tarefas manuais e aumentamos nossa produtividade em 300%.",
      initials: "MC",
      company: "TechStart",
    },
    {
      name: "João Silva",
      role: "CTO, InnovaCorp",
      content:
        "Interface intuitiva e automações poderosas. Exatamente o que precisávamos para escalar nossa operação sem contratar mais pessoas.",
      initials: "JS",
      company: "InnovaCorp",
    },
    {
      name: "Ana Santos",
      role: "Diretora, FlexSolutions",
      content:
        "Suporte excepcional e ROI comprovado em 30 dias. Recomendo para qualquer empresa que busca eficiência real.",
      initials: "AS",
      company: "FlexSolutions",
    },
  ];

  const stats = [
    { number: "10K+", label: "Empresas Ativas" },
    { number: "98%", label: "Satisfação dos Clientes" },
    { number: "2.5M+", label: "Tarefas Automatizadas" },
    { number: "15h", label: "Economia Semanal" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-600 transition-transform group-hover:scale-110 duration-300" />
              <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FlowPro
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Recursos", "Preços", "Sobre", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex hover:bg-blue-50"
            >
              Entrar
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              Começar Grátis
            </Button>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {["Recursos", "Preços", "Sobre", "Contato"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-xl opacity-20 animate-pulse animation-delay-4000" />

        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 animate-fade-in">
            <Sparkles className="w-3 h-3 mr-1" />
            Novo: Automação com IA Generativa
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
              Automatize seu fluxo
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              e multiplique resultados
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            FlowPro é a plataforma SaaS que conecta suas ferramentas, automatiza
            tarefas repetitivas com IA e libera seu tempo para estratégias que
            realmente geram valor.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 animate-fade-in-up animation-delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-blue-50 hover:border-blue-300 group transition-all duration-300"
            >
              Ver Demo ao Vivo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-12 text-sm text-muted-foreground animate-fade-in-up animation-delay-800">
            ✨ 14 dias grátis • Sem cartão de crédito • Setup em 5 minutos
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              Recursos Poderosos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Recursos que
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                transformam{" "}
              </span>
              sua produtividade
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Descubra como o FlowPro pode revolucionar a forma como você e sua
              equipe trabalham
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 bg-white dark:bg-gray-900"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Por que escolher FlowPro?
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">300% mais produtividade</h4>
                <p className="text-sm text-muted-foreground">
                  Aumento médio na eficiência das equipes
                </p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">15h economizadas/semana</h4>
                <p className="text-sm text-muted-foreground">
                  Tempo livre para focar no estratégico
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">500+ integrações</h4>
                <p className="text-sm text-muted-foreground">
                  Conecte todas suas ferramentas favoritas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-50 text-green-700 border-green-200">
              Casos de Sucesso
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              O que nossos
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                clientes{" "}
              </span>
              dizem
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Mais de 10.000 empresas confiam no FlowPro para transformar seus
              processos
            </p>
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">4.9/5</span>
              <span className="text-muted-foreground">(2,847 avaliações)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-900 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-card-foreground mb-6 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            🚀 Comece Hoje Mesmo
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Pronto para
            <span className="text-yellow-300"> transformar </span>
            sua produtividade?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Junte-se a milhares de empresas que já automatizaram seus processos
            e multiplicaram seus resultados com o FlowPro
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Começar Teste Gratuito de 14 Dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4"
            >
              Agendar Demonstração Personalizada
            </Button>
          </div>

          <div className="text-white/80 text-sm">
            ✅ Setup em 5 minutos • ✅ Sem compromisso • ✅ Suporte em português
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">FlowPro</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Automatize, otimize e cresça com a plataforma de produtividade
                mais avançada do mercado. Transforme seu tempo em resultados
                extraordinários.
              </p>
              <div className="flex space-x-4">
                {["LinkedIn", "Twitter", "YouTube"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                  >
                    <span className="text-xs font-semibold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Produto</h3>
              <ul className="space-y-3">
                {["Recursos", "Integrações", "API", "Segurança", "Preços"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Empresa</h3>
              <ul className="space-y-3">
                {["Sobre", "Blog", "Carreiras", "Imprensa", "Parceiros"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-white">Suporte</h3>
              <ul className="space-y-3">
                {[
                  "Central de Ajuda",
                  "Documentação",
                  "Status",
                  "Comunidade",
                  "Contato",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2024 FlowPro. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              {["Privacidade", "Termos", "Cookies", "LGPD"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
