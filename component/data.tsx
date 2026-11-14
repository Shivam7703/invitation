import { tilak, haldi, mehndi, wedding } from "@/assets";
import { StaticImageData } from "next/image";

export type EventItem = {
  id: string;
  name: string;
  hindi: string;
  img: StaticImageData;
  day: string;
  month: string;
  year: string;
  weekday: string;
  time: string;
};

export type FamilyCardData = {
  hindi: string;
  label: string;
  family: string;
  parentsTitle: string;
  parents: string;
  grandparents: string;
};



export const familyData = {
  eyebrow: "WITH THE BLESSINGS OF OUR ELDERS",
  heading: "Our Families",
  description:
    "Two families come together to celebrate love, tradition, and a beautiful new beginning.",
  sideAlt: "Decorative side ornament",
  coupleAlt: "Nikhil and Ritika",
  grandparentsTitle: "Grandparents",
  groom: {
    hindi: "वर पक्ष",
    label: "GROOM'S FAMILY",
    family: "The Sharma Family",
    parentsTitle: "Parents of the Groom",
    parents: "Mrs. Sunita & Mr. Rajesh Sharma",
    grandparents: "Late Smt. & Shri Rameshwar Sharma",
  } satisfies FamilyCardData,
  bride: {
    hindi: "वधू पक्ष",
    label: "BRIDE'S FAMILY",
    family: "The Verma Family",
    parentsTitle: "Parents of the Bride",
    parents: "Mrs. Anita & Mr. Suresh Verma",
    grandparents: "Smt. & Shri Harish Chandra Verma",
  } satisfies FamilyCardData,
};

export const eventsData = {
  /* ✏️ Venue yahin se badlo */
  venue: "The Grand Pavilion, Civil Lines, Delhi, India",
  heading: "Events",
  description:
    "Four days of rituals, music and blessings. Scroll through each ceremony to see when and where it happens, or pick one from the list.",
  imgAltSuffix: "illustration",
  labels: {
    time: "TIME",
    venue: "VENUE",
    maps: "VIEW ON GOOGLE MAPS",
  },
  items: [
    { id: "tilak", name: "Tilak", hindi: "तिलक", img: tilak, day: "29", month: "JAN", year: "2027", weekday: "Friday", time: "11:00 AM onwards" },
    { id: "haldi", name: "Haldi", hindi: "हल्दी", img: haldi, day: "01", month: "FEB", year: "2027", weekday: "Monday", time: "11:00 AM onwards" },
    { id: "mehndi", name: "Mehndi", hindi: "मेहंदी", img: mehndi, day: "02", month: "FEB", year: "2027", weekday: "Tuesday", time: "4:00 PM onwards" },
    { id: "wedding", name: "Wedding", hindi: "विवाह", img: wedding, day: "04", month: "FEB", year: "2027", weekday: "Thursday", time: "7:00 PM onwards" },
  ] satisfies EventItem[],
};

export const bannerData = {
  mantra: "ॐ श्री गणेशाय नमः",
  ganeshaAlt: "Lord Ganesha",
  intro: "TOGETHER WITH THEIR FAMILIES",
  groom: "NIKHIL",
  connector: "and",
  bride: "RITIKA",
  inviteLine: "INVITE YOU TO CELEBRATE THEIR WEDDING",
  date: {
    month: "FEB",
    day: "04",
    year: "2027",
  },
  timing: "THURSDAY | 6:00 PM ONWARDS",
};

export const inviteData = {
  hindi: "सादर आमंत्रण",
  heading: "You Are Warmly Invited",
  coupleAlt: "Nikhil and Ritika",
  paragraphs: [
    "With hearts full of joy and the blessings of our elders, we invite you to celebrate the beginning of our new journey together.",
    "Your presence and your blessings will make our wedding truly special. Come share the laughter, the rituals and the memories with us.",
  ],
  signOff: "With love and gratitude,",
  names: "NIKHIL & RITIKA",
  families: "AND BOTH OUR FAMILIES",
};

/* ✏️ Yahin se date badlo (month 0-based: Feb = 1) */
export const saveTheDateData = {
  year: 2027,
  month: 1,
  day: 4,
  weddingISO: "2027-01-04T18:00:00+05:30", // ⚠️ 2027-02-04 hona chahiye
  calendarEvent: {
    title: "Nikhil & Ritika Wedding",
    startUTC: "20270104T123000Z", // 6:00 PM IST  ⚠️ 20270204 hona chahiye
    endUTC: "20270104T173000Z", // 11:00 PM IST ⚠️ 20270204 hona chahiye
    details: "Join us in celebrating the wedding of Nikhil & Ritika.",
    location: "The Grand Pavilion, Civil Lines, Azamgarh, Uttar Pradesh",
  },
  weekdays: ["S", "M", "T", "W", "T", "F", "S"],
  eyebrow: "MARK YOUR CALENDAR",
  heading: "Save the Date",
  description:
    "Our big day is almost here. Add it to your calendar so you don't miss a moment.",
  countdownLabels: ["Days", "Hours", "Minutes", "Seconds"],
  buttonText: "SAVE THE DATE",
  calendarNote: "Thursday, 6:00 PM onwards",
};

const ev = saveTheDateData.calendarEvent;

export const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent(ev.title) +
  "&dates=" + ev.startUTC + "/" + ev.endUTC +
  "&details=" + encodeURIComponent(ev.details) +
  "&location=" + encodeURIComponent(ev.location);

  /* ✏️ Saari details yahin se badlo (phone: country code ke saath, + aur space ke bina) */
const footerCouple = "Nikhil & Ritika";

export const footerData = {
  couple: footerCouple,
  venue: eventsData.venue,
  blessing: "॥ शुभ विवाह ॥",
  thanks: "Thank you for being a part of our story. We can't wait to celebrate with you.",
  headings: {
    contact: "Contact Us",
    venue: "Venue",
    schedule: "Celebrations",
  },
  buttons: {
    call: "CALL",
    whatsapp: "WHATSAPP",
    maps: "OPEN IN GOOGLE MAPS",
    rsvp: "RSVP ON WHATSAPP",
    share: "SHARE INVITE",
    copy: "COPY LINK",
    copied: "LINK COPIED",
  },
  weddingDayLabel: "WEDDING DAY",
  weddingDay: "Thursday, 4th February 2027",
  invitedByLabel: "WITH BEST COMPLIMENTS FROM",
  tagline: "A celebration of love & togetherness",
  copyright: "© 2027 NIKHIL & RITIKA · WITH LOVE, THE SHARMA & VERMA FAMILIES",
  shareText: `You are warmly invited to the wedding of ${footerCouple}.`,
  rsvpText: `Hello! I would like to confirm my presence at ${footerCouple}'s wedding.`,
  invitedBy: [
    { side: "Groom's Family", names: "Mr. Rajesh & Mrs. Sunita Sharma" },
    { side: "Bride's Family", names: "Mr. Suresh & Mrs. Anita Verma" },
  ],
  contacts: [
    { name: "Shivam Goyal", role: "Groom's Father", phone: "918218885483", display: "+91 8218885483" },
    { name: "Shivam Goyal", role: "Bride's Father", phone: "918218885483", display: "+91 8218885483" },
  ],
  schedule: [
    { name: "Tilak", date: "29 Jan 2027" },
    { name: "Haldi", date: "1 Feb 2027" },
    { name: "Mehndi", date: "2 Feb 2027" },
    { name: "Wedding", date: "4 Feb 2027" },
  ],
};

export const footerMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  footerData.venue
)}`;