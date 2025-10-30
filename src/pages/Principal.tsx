import HeaderLanding from "../components/landing/HeaderLanding";
import HeroSection from "../components/landing/HeroSection";
import StepsSection from "../components/landing/StepsSection";
import FooterLanding from "../components/landing/FooterLanding";
import BackedByUnac from "../components/landing/BackedByUnac";
import ChatWidget from "../components/chatbot/ChatWidget";

export default function Principal() {
    return (
        <div className="bg-gray-50 text-gray-900 font-sans overflow-x-hidden">
            <HeaderLanding />
            <main>
                <HeroSection />
                <StepsSection />
                <BackedByUnac />
            </main>
            <FooterLanding />
            <ChatWidget /> 
        </div>
    );
}
