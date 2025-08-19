"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  Users,
  Phone,
  FileText,
  X,
  Map,
  User,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Wer sind die Mitglieder der Projektgruppe 'Ärztliche Versorgung'?",
    answer: `Die Projektgruppe setzt sich wie folgt zusammen:

Vorsitz: BGM Joachim Fritz (FPF)

Mitglieder:
- GV Rolf Fischer (Pro Kleinwalsertal)
- GV Elisabeth Jocham (Offene Bürgerliste)
- GV Benedikt Fritz (Walser Liste)
- Martina Gurschler (Extern)
- Sabrina Schöch (Verwaltung)
- Roland Ritsch (Verwaltung)
- Marcus Fritz (Verwaltung)`,
  },
  {
    question: "Was ist seit der Wahl im März 2025 passiert?",
    answer:
      'Nach der Wahl wurde die bestehende Projektgruppe "Ärztliche Versorgung" neu aktiviert, wobei die personelle Zusammensetzung bis auf einen Wechsel (Elisabeth Jocham für Andi Haid) weitgehend gleich blieb. Die Gruppe erarbeitete einen Kriterienkatalog mit 27 Punkten, der als Grundlage für eine objektive Bewertung diente. Dieser Katalog wurde der AKS Gesundheit GmbH übergeben, mit dem Auftrag, die beiden möglichen Standorte – den Neubau in Hirschegg und eine Lösung im Sterngebäude in Riezlern – zu prüfen. Die AKS schloss diese Prüfung ab und legte ihr Gutachten Ende April 2025 vor. Parallel dazu wurden die Gespräche mit den Anrainern am Standort Hirschegg fortgeführt, um eine einvernehmliche Lösung bezüglich der Wegerechte und Zufahrt zu finden.',
  },
  {
    question: "Warum wurde jetzt der Standort Hirschegg und nicht die Alternative im Sterngebäude gewählt?",
    answer:
      "Nach einer Prüfung beider Standorte durch die AKS auf Basis eines 27-Punkte-Kriterienkatalogs sprach sich die Projektgruppe für Hirschegg aus. Die wesentlichen Unterschiede sind: 1)Kapazität (Hirschegg ermöglicht 3 Kassenstellen vs. max. 2 im Sterngebäude), Betreibermodell (AKS als alleinige Bauherrin in Hirschegg), und konkretes Ärzte-Interesse für Hirschegg liegt bereits vor.",
  },
  {
    question: "Was muss bis zur nächsten GV-Sitzung am 8. Juli noch passieren?",
    answer:
      "Die Gemeinde verhandelt nun mit dem AKS den Baurechts- und den Projektsicherungsvertrag. Beim Baurechtsvertrag geht es insbesondere um die Vertragsdauer (ca. 50 oder 75 Jahre), den Baurechtszins (ähnlich einer Pacht) und die Stundung dieses Zinses für die Anfangsjahre. Beim Projektsicherungsvertrag geht es um die Einzelheiten wie die genauen Haftungsregeln, die Anreize für eine rasche Akquise der Ärzte und die Klärung weiterer Verantwortlichkeiten zwischen Gemeinde und AKS.",
  },
  {
    question: "Wie sieht der Zeitplan für die Umsetzung aus?",
    answer:
      "Nach einem erfolgreichen Vertragsabschluss im Juli könnte mit einem Baubeginn gerechnet werden, der eine Fertigstellung des Ärztehauses Ende 2026 ermöglicht.",
  },
  {
    question: "Wer trägt die Baukosten für das Ärztehaus? ",
    answer:
      "Beim Standort Hirschegg trägt die AKS Gesundheit GmbH als Bauherrin die gesamten Baukosten. Für die Gemeinde fallen keine direkten Baukosten an. Bei der Alternative im Sterngebäude in Riezlern wäre ein anderes Finanzierungsmodell zum Tragen gekommen. Hier hätten sich die Gemeinde und die Walser Raiffeisen Holding die Kosten geteilt. Der Anteil für die Gemeinde wäre bei diesem Modell auf ca. 500.000 € geschätzt worden.",
  },
  {
    question: "Welche Kosten entstehen der Gemeinde durch das Projekt?",
    answer:
      "Den Bau selbst finanziert die AKS. Kosten für die Gemeinde entstehen indirekt durch die Verpflichtung zur Ausfallshaftung und den temporären Verzicht auf Einnahmen aus dem Baurechtszins in der Anfangsphase des Projekts.",
  },
  {
    question: "Wer betreibt das Ärztehaus?",
    answer:
      "Für den nun beschlossenen Standort Hirschegg ist die AKS Gesundheit GmbH als alleinige Betreiberin vorgesehen. Sie würde den Ärzten ein umfassendes Servicepaket anbieten, das von der Verwaltung bis zur Akquise reicht, und tritt als direkter Partner für die Ärzte auf. Bei der Alternative im Sterngebäude in Riezlern wäre das Betreibermodell komplexer gewesen. Hier wären die Gemeinde und die Walser Raiffeisen Holding die primären Betreiber (als Bauherren) gewesen. Die Rolle der AKS wäre in diesem Modell auf die eines reinen Dienstleisters beschränkt gewesen, woran die AKS selbst nur geringes Interesse zeigte.",
  },
  {
    question: "Warum übernimmt die Gemeinde eine Ausfallshaftung?",
    answer:
      "Die AKS Gesundheit GmbH ist als gemeinnütziger Verein statutarisch verpflichtet, keine unternehmerischen Risiken zu tragen. Um die Finanzierung des Neubaus für die AKS zu ermöglichen, sichert die Gemeinde daher zu, für den Mietzins einer Praxis aufzukommen, sollte diese temporär nicht besetzt werden können. Ohne diese Haftung würde die AKS das Projekt nicht umsetzen.",
  },
  {
    question: "Wie hoch ist das finanzielle Risiko für die Gemeinde durch die Ausfallshaftung?",
    answer:
      "Die genaue Höhe und die Konditionen sind Teil der laufenden Vertragsverhandlungen. Die genannte Obergrenze von 50.000 € pro Jahr und unbesetzter Kassenstelle stellt eine Schätzung dar. In den Verhandlungen wird angestrebt, die Haftung an die tatsächliche Miethöhe zu koppeln. Die Haftung fällt nur anteilig für die Dauer eines Leerstandes an.",
  },
  {
    question: "Wie lange wird die Gemeinde für einen möglichen Mietausfall haften müssen?",
    answer:
      "Dieser Punkt ist Teil der finalen Vertragsverhandlungen. Es wird davon ausgegangen, dass die Haftung für die Dauer der Finanzierung des Gebäudes durch die AKS vorgesehen ist. Eine endgültige Festlegung steht noch aus.",
  },
  {
    question: "Bezieht sich die Ausfallshaftung der Gemeinde auf das gesamte Gebäude oder nur auf die Praxisflächen?",
    answer:
      "Die Ausfallshaftung der Gemeinde wird voraussichtlich nur für die reinen Praxisflächen erwartet, nicht für die zusätzlichen Büro- oder Wohneinheiten. Auch dies wird im Projektsicherungsvertrag final geregelt.",
  },
  {
    question: "Warum will die Gemeinde einen Baurechtsvertrag mit der AKS abschliessen?",
    answer:
      "Die Gemeinde bleibt Eigentümerin des Grundstücks. Sie überträgt das Recht, auf diesem Grundstück zu bauen (Baurecht), für einen langen Zeitraum an die AKS. Im Gegenzug erhält die Gemeinde einen jährlichen Baurechtszins (ca. 20.000 €/Jahr nach der Anlaufphase).",
  },
  {
    question: "Wurden die Bedenken der Nachbarn am Standort Hirschegg berücksichtigt?",
    answer:
      "Ja. Die ursprünglichen Bedenken bezüglich Wegerechten und Zufahrt wurden in Gesprächen geklärt. Laut Protokoll der Klausurtagung vom 03.06.2025 liegt eine schriftliche Einigung mit den Anrainern vor.",
  },
  {
    question: "Können die neuen Kassenarztstellen auch von Fachärzten besetzt werden?",
    answer:
      "Nein, bei den zu besetzenden Stellen handelt es sich ausschließlich um Kassenstellen für Allgemeinmedizin.",
  },
  {
    question:
      "Sind die Kosten für das medizinische Mobiliar und die Ausstattung in den geschätzten Baukosten enthalten?",
    answer:
      "Ob und in welchem Umfang die Erstausstattung der Praxen in den Baukosten enthalten ist, wurde in der Klausur als offener Punkt vermerkt und muss noch geklärt werden.",
  },
  {
    question: "Wie ist die Parksituation am Standort Hirschegg geregelt und ist sie ausreichend?",
    answer:
      "Die aktuelle Planung sieht mehr Parkplätze vor als frühere Entwürfe. Nach Einschätzung der Projektverantwortlichen ist die geplante Anzahl an Stellplätzen für die Praxis, die weiteren Dienstleister und die Wohnungen ausreichend.",
  },
  {
    question: "Wer hat den aktuellen Bauplan erstellt?",
    answer:
      "Es gab einen früheren Vorentwurf von Architekt Tobias Fritz. Die AKS als zukünftige Bauherrin hat auf eigene Rechnung einen neuen Plan vom Büro Drexelbau aus Mittelberg beauftragt. Dieser aktuelle Plan ist die Grundlage für den nun angestrebten Bau.",
  },
]

export function ArztehausInfo() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const scrollToStatement = () => {
    const element = document.getElementById("vollstaendige-stellungnahme")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleProtokollClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/logo-mittelberg.png"
                  alt="Gemeinde Mittelberg Logo"
                  width={48}
                  height={48}
                  className="rounded-md"
                />
              </div>
              <div>
                <div className="text-xs text-gray-500">Gemeinde</div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Mittelberg</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Gemeinde
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Politik
              </a>
              <a href="#" className="text-gray-900 font-medium">
                Fachgruppen
              </a>
            </nav>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="flex flex-col items-center text-gray-500 hover:text-gray-900">
                <Map className="w-5 h-5" />
                <span className="text-xs">Karte</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 hover:text-gray-900">
                <User className="w-5 h-5" />
                <span className="text-xs">Konto</span>
              </a>
              <a href="#" className="flex flex-col items-center text-gray-500 hover:text-gray-900">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">Intern</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
            <span>Gemeinde Mittelberg</span>
            <span className="mx-2">›</span>
            <span>Gemeinde</span>
            <span className="mx-2">›</span>
            <span>Politik</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Projekt Ärztehaus</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Title and Last Updated */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
            Projekt Ärztehaus: Informationen zum aktuellen Stand der ärztlichen Versorgung
          </h1>
          <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Letzte Aktualisierung: 09. Juni 2025</span>
          </div>
        </div>

        {/* Building Visualization and Introduction Text */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:w-2/5">
            <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[280px] rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UpDBXKjo0UqczuKPG2bh4OI23tgCML.png"
                alt="Ansicht des geplanten Ärztehauses in Hirschegg"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 right-0 bg-white bg-opacity-80 px-2 sm:px-3 py-1 m-2 text-xs font-medium rounded">
                Ansicht von Osten © Drexelbau GmbH
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 flex items-center">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Die Sicherstellung einer flächendeckenden hausärztlichen Versorgung ist eine der zentralen Aufgaben für
              die Gemeinde. Auf dieser Seite finden Sie die wesentlichen Fakten und Entwicklungen zum Projekt Ärztehaus.
            </p>
          </div>
        </div>

        {/* Das Wichtigste in Kürze */}
        <Card className="mb-6 sm:mb-8 border-l-4 border-l-[#2c7fb8] shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-[#2c7fb8]">Das Wichtigste in Kürze</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                    Worum geht es?
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  <strong> Aktuell ist im Kleinwalsertal von vier Kassenarztstellen nur eine besetzt</strong>. Ziel des
                  Projekts ist es, die notwendige Infrastruktur zu schaffen, um neue Ärztinnen und Ärzte für das Tal zu
                  gewinnen und die medizinische Versorgung langfristig zu sichern.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    Aktueller Stand
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  Die Gemeindevertretung hat in ihrer Sitzung am <strong>5. Juni 2025</strong> einen{" "}
                  <strong>Grundsatzbeschluss</strong> gefasst: Das Projekt Ärztehaus am{" "}
                  <strong>Standort Hirschegg</strong> (ehemaliges Molkerei-Grundstück) wird in Partnerschaft mit der AKS
                  Gesundheit GmbH weiterverfolgt.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                    Nächster Schritt
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  Auf Basis des Beschlusses werden nun die{" "}
                  <strong>finalen Verträge zwischen der Gemeinde und der AKS</strong> ausgearbeitet. Die finalen
                  Verträge sollen der Gemeindevertretung am <strong>8. Juli 2025</strong> zur Abstimmung vorgelegt
                  werden.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>
                  <strong>Ansprechpartner:</strong> Gemeindeamt Mittelberg - Tel: +43 5517 5321
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projektgruppe Statement */}
        <Card className="mb-6 sm:mb-8 border-l-4 border-l-[#2c7fb8] bg-blue-50 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-[#2c7fb8]">
              Einstimmige Empfehlung der Projektgruppe „Ärztliche Versorgung"
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-800">
            <p className="mb-4 text-sm sm:text-base">
              Die Projektgruppe „Ärztliche Versorgung" hat nach intensiver Prüfung und Abwägen aller ihr vorliegenden
              Erkenntnisse der nun mehrjährigen Arbeit beschlossen, der Gemeindevertretung die Umsetzung des Ärztehaus
              mit Standort Hirschegg mit der AKS Gesundheit GmbH zu empfehlen. Ziel soll eine baldmöglichste Umsetzung
              der Versorgung im Kleinwalsertal sein. Die dafür notwendigen weiteren Schritte müssen in einem
              Projektsicherungsvertrag zwischen der Gemeinde Mittelberg mit der AKS Gesundheit GmbH erarbeitet werden.
            </p>
            <button
              onClick={scrollToStatement}
              className="text-xs sm:text-sm text-[#2c7fb8] flex items-center hover:text-[#1a5a82] transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span className="underline">Vollständige Stellungnahme in den FAQ</span>
            </button>
          </CardContent>
        </Card>

        {/* Dokumente zum Download */}
        <Card className="mb-6 sm:mb-8 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl text-gray-700">
              <Download className="w-5 h-5" />
              <span>Dokumente zum Download</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Präsentation aus der Klausur vom 03.06.2025
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Detaillierte Gegenüberstellung der Standorte Hirschegg und Sterngebäude
                  </p>
                </div>
                <a
                  href="https://drive.google.com/file/d/1WdxiT7FmUCZ19Oqe5kbTRvho-kKst7kv/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Bauplan Ärztehaus Hirschegg (Büro Drexelbau)
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Der von der AKS beauftragte und für den Bau vorgesehene Plan
                  </p>
                </div>
                <a
                  href="https://drive.google.com/file/d/1AZEQAYhkcAKfhZTrRrNnvGyI6Uq-RdfF/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    Niederschrift der Gemeindevertretungssitzung vom 05.06.2025
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">Formelles Protokoll der Sitzung</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleProtokollClick}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl text-gray-700">
              <Users className="w-5 h-5" />
              <span>Häufig gestellte Fragen</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-3 sm:px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4 text-sm sm:text-base">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-3 sm:px-4 pb-4 text-gray-700 leading-relaxed border-t border-gray-100">
                      <div
                        className="pt-3 prose prose-sm max-w-none text-sm sm:text-base"
                        dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, "<br />") }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vollständige Stellungnahme der Projektgruppe */}
        <Card className="mt-6 sm:mt-8 shadow-sm" id="vollstaendige-stellungnahme">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-gray-700">
              Vollständige Stellungnahme der Projektgruppe 'Ärztliche Versorgung'
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p className="text-sm sm:text-base mb-4">
              Die in den letzten Wochen erfolgte Zusammenarbeit mit dem AKS kann als vertrauensvoll und professionell
              beschrieben werden, weshalb es keinen Anlass gibt, die positive Umsetzung des Projektes und der damit
              verbundenen dringend notwendigen ärztlichen Versorgung in Frage zu stellen. Da der AKS statutengemäß zur
              Gemeinnützigkeit verpflichtet ist, ist es diesem untersagt Risiko zu tragen, weshalb für die
              Projektumsetzung eine Haftungsübernahme erforderlich ist. Auch wenn in erster Linie die ÖGK für die
              ärztliche Versorgung zuständig wäre, so besteht seitens der Gemeinde Mittelberg größtes Interesse, die
              ärztliche Versorgung nach vielen Jahren wieder sicherzustellen. Somit trifft auch die Gemeinde als
              Fürsorgerin der Bürger sehr wohl die Verpflichtung, alles zu unternehmen, um diesen Zustand zu verbessern.
            </p>
            <p className="text-sm sm:text-base mb-4">
              Um dem deutlichen und wiederholten Zuruf, nicht nur der Ärztekammer, sondern auch der für Gesundheit und
              Soziales zuständigen Landesrätin Martina Rüscher zu folgen, als Gemeinde für die ärztliche Versorgung den
              Mut zu haben, Investitionen zu tätigen, spricht sich die Projektgruppe einstimmig dafür aus, das Projekt
              Ärztehaus Hirschegg zu unterstützen und für den unwahrscheinlichen Fall des Eintretens, die
              Ausfallshaftung zu übernehmen um damit den dringend notwendigen Grundstein für die längst überfällige
              Wiederherstellung der ärztlichen Versorgung zu setzen.
            </p>
            <p className="text-sm sm:text-base mb-4">
              Es wird auch darauf hingewiesen, dass in dieser Angelegenheit unmissverständlich von allen Stellen an die
              Gemeinde kommuniziert wurde, dass eine weitere Bereitschaft zur Unterstützung der Gemeinde Mittelberg bei
              nochmaligem Versäumnis der jetzt möglichen Umsetzung nicht mehr erfolgen kann. Da auch der AKS eine klare
              Präferenz für das Ärztehaus in Hirschegg ausgesprochen hat und einer Lösung im Sterngebäude als Plan B
              nicht zugetan ist, war zusätzlich zu den angeführten vielen Vorteilen die Entscheidung in der
              Projektgruppe zu treffen.
            </p>
            <p className="text-sm sm:text-base">
              Die Projektgruppe „Ärztliche Versorgung" hat somit nach intensiver Prüfung und Abwägen aller ihr
              vorliegenden Erkenntnisse der nun mehrjährigen Arbeit beschlossen, der Gemeindevertretung die Umsetzung
              des Ärztehaus mit Standort Hirschegg mit der AKS Gesundheit GmbH zu empfehlen. Ziel soll eine
              baldmöglichste Umsetzung der Versorgung im Kleinwalsertal sein. Die dafür notwendigen weiteren Schritte
              müssen in einem Projektsicherungsvertrag zwischen der Gemeinde Mittelberg mit der AKS Gesundheit GmbH
              erarbeitet werden.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="text-center text-xs sm:text-sm text-gray-600">
            <p>© 2025 Gemeinde Mittelberg | Kleinwalsertal, Österreich</p>
            <p className="mt-2">
              Bei Fragen wenden Sie sich an das Gemeindeamt:
              <a href="tel:+4355175321" className="text-[#2c7fb8] hover:underline ml-1">
                +43 5517 5321
              </a>
            </p>
          </div>
        </footer>

        {/* Popup Notification */}
        {showPopup && (
          <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-xs z-50 border border-gray-200 animate-fade-in">
            <div className="flex items-start">
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">Wird zeitnah veröffentlicht.</p>
              </div>
              <button onClick={() => setShowPopup(false)} className="ml-4 text-gray-400 hover:text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
