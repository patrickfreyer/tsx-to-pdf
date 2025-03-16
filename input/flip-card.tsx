import React, { useState } from 'react';
import { Calendar, Gift, MapPin, Clock, Music, User, Users, Cake } from 'lucide-react';

interface BirthdayInviteProps {
  name?: string;
  age?: number;
  date?: string;
  time?: string;
  location?: string;
  theme?: string;
  message?: string;
  rsvpEmail?: string;
  rsvpPhone?: string;
}

const BirthdayInvite: React.FC<BirthdayInviteProps> = ({
  name = "Sarah Johnson",
  age = 30,
  date = "Saturday, June 15, 2024",
  time = "7:00 PM - 11:00 PM",
  location = "Sunset Lounge, 123 Party Avenue, Celebration City",
  theme = "Tropical Paradise",
  message = "Join us for an evening of fun, food, and celebration as we mark this special milestone!",
  rsvpEmail = "sarah.party@email.com",
  rsvpPhone = "(555) 123-4567"
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const colors = {
    primary: "#ff6b6b",
    secondary: "#ffd166",
    background: "#f9f7f3",
    text: "#2c3e50"
  };

  return (
    <div 
      style={{ 
        fontFamily: "'Poppins', sans-serif",
        maxWidth: "600px", 
        margin: "0 auto",
        perspective: "1000px"
      }}
    >
      <div 
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          cursor: "pointer"
        }}
        onClick={flipCard}
      >
        {/* Front of card */}
        <div 
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: colors.background,
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `5px solid ${colors.secondary}`,
            boxSizing: "border-box"
          }}
        >
          <div 
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "50px",
              backgroundColor: colors.primary,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          
          <Cake size={60} color={colors.primary} style={{ marginBottom: "20px" }} />
          
          <h3 style={{ color: colors.primary, margin: "0 0 5px 0", fontSize: "16px", textTransform: "uppercase", letterSpacing: "2px" }}>
            Birthday Celebration
          </h3>
          
          <h1 style={{ color: colors.text, margin: "10px 0", fontSize: "36px", textAlign: "center" }}>
            {name} is turning {age}!
          </h1>
          
          <p style={{ color: colors.text, margin: "10px 0 25px", textAlign: "center", lineHeight: "1.6" }}>
            {message}
          </p>
          
          <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <Calendar size={20} color={colors.primary} style={{ marginRight: "10px" }} />
            <span style={{ color: colors.text }}>{date}</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <Clock size={20} color={colors.primary} style={{ marginRight: "10px" }} />
            <span style={{ color: colors.text }}>{time}</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <MapPin size={20} color={colors.primary} style={{ marginRight: "10px" }} />
            <span style={{ color: colors.text }}>{location}</span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
            <Music size={20} color={colors.primary} style={{ marginRight: "10px" }} />
            <span style={{ color: colors.text }}>Theme: {theme}</span>
          </div>
          
          <p style={{ 
            color: colors.text, 
            margin: "25px 0 0", 
            textAlign: "center", 
            fontStyle: "italic",
            fontSize: "14px"
          }}>
            (Click to see RSVP details)
          </p>
        </div>
        
        {/* Back of card */}
        <div 
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            backgroundColor: colors.primary,
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotateY(180deg)",
            boxSizing: "border-box"
          }}
        >
          <h2 style={{ color: "white", margin: "0 0 30px 0", textAlign: "center" }}>RSVP</h2>
          
          <div style={{ 
            backgroundColor: "white", 
            padding: "30px", 
            borderRadius: "10px",
            width: "80%",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <p style={{ 
              color: colors.text, 
              margin: "0 0 20px", 
              textAlign: "center", 
              fontWeight: "bold"
            }}>
              Please RSVP by {new Date().getMonth() === 5 ? "June 1st" : "two weeks before the event"}
            </p>
            
            <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              <User size={20} color={colors.primary} style={{ marginRight: "10px", flexShrink: 0 }} />
              <span style={{ color: colors.text }}>{rsvpEmail}</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              <Users size={20} color={colors.primary} style={{ marginRight: "10px", flexShrink: 0 }} />
              <span style={{ color: colors.text }}>{rsvpPhone}</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", margin: "20px 0 0", justifyContent: "center" }}>
              <Gift size={20} color={colors.primary} style={{ marginRight: "10px" }} />
              <span style={{ color: colors.text }}>Your presence is the best gift!</span>
            </div>
          </div>
          
          <p style={{ 
            color: "white", 
            margin: "25px 0 0", 
            textAlign: "center", 
            fontStyle: "italic",
            fontSize: "14px"
          }}>
            (Click to see invitation details)
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayInvite;