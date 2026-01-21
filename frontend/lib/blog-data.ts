export interface BlogPost {
    slug: string;
    cat: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    content: string;
    author: string;
    readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "future-of-diamonds-transparency",
        cat: "Sustainability",
        date: "Jan 14, 2026",
        author: "Sarah Mitchell",
        readTime: "8 min",
        title: "The Future of Diamonds: Why Transparency is the New Luxury.",
        excerpt: "Discover how blockchain technology and ethical sourcing protocols are transforming the way we value and purchase fine jewelry in the modern world.",
        image: "https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F5d1212c525024258ab3e2212e86e85dd&w=1920&q=75&dpl=a04e727cd2fb07c9e057b0f6f9cdca82a6798dad",
        content: `
            <p>In an era where consumers are increasingly conscious of their environmental and social footprint, the jewelry industry is undergoing a profound transformation. The traditional allure of a diamond—its sparkle, rarity, and sentiment—is now being supplemented by a new, equally important metric: transparency.</p>
            
            <h3>The Shift Toward Ethical Sourcing</h3>
            <p>For decades, the journey of a diamond from the mine to the finger was shrouded in mystery. Today, that is changing. At Ritzin, we believe that luxury shouldn't come at a cost to the planet or its people. Our commitment to Beyond Conflict Free™ diamonds means we go above and beyond standard industry practices to ensure our gems are ethically sourced.</p>
            
            <h3>Blockchain: The Digital Ledger of Trust</h3>
            <p>One of the most exciting innovations in our industry is the use of blockchain technology. By creating a digital, tamper-proof record of a diamond's journey, we can provide our customers with verifiable proof of origin. This isn't just about data; it's about peace of mind.</p>
            
            <img src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=1200" alt="Diamond Inspection" class="my-12 rounded-sm" />
            
            <h3>A New Definition of Luxury</h3>
            <p>Transparency is no longer a "nice-to-have" feature; it is the very definition of modern luxury. When you choose a Ritzin diamond, you're not just buying a stone; you're supporting a movement toward a more beautiful, ethical, and transparent world.</p>
        `
    },
    {
        slug: "2026-engagement-ring-trends",
        cat: "Trends",
        date: "Jan 10, 2026",
        author: "James Lawrence",
        readTime: "6 min",
        title: "2026 Engagement Ring Trends: Minimalist Silhouettes & East-West Settings",
        excerpt: "Minimalism meets modern geometry. Explore the top engagement ring styles dominating the 2026 bridal landscape.",
        image: "https://image.brilliantearth.com/media/thumbnail/c3/a4/c3a4c414356ca5315fe244611f6469ba.jpg",
        content: `
            <p>As we head into 2026, engagement ring designs are moving toward a 'less is more' philosophy. While maximalist halos had their moment, today's couples are gravitating toward clean lines and unique orientations.</p>
            
            <h3>1. The East-West Setting</h3>
            <p>By rotating an elongated stone (like an emerald or oval cut) 90 degrees, designers are creating a profile that feels simultaneously classic and avant-garde. It's a subtle tweak that makes a bold statement.</p>
            
            <h3>2. Ultra-Thin Bands</h3>
            <p>Known as 'whisper bands,' these settings use structural engineering to support larger diamonds on bands that seem to disappear, making the center stone look like it's floating on the hand.</p>
            
            <img src="https://image.brilliantearth.com/media/thumbnail/50/7a/507aeec9e19d5c4115167098f98a335a.jpg" alt="East West Setting" class="my-12 rounded-sm" />
            
            <h3>3. Mixed Metal Stacks</h3>
            <p>The rules of coordination are being rewritten. Mixing yellow gold engagement rings with platinum wedding bands is no longer a faux pas—it's a deliberate design choice that adds depth and personality.</p>
        `
    },
    {
        slug: "lab-grown-vs-natural-diamonds",
        cat: "Education",
        date: "Jan 05, 2026",
        author: "Dr. Elena Vance",
        readTime: "10 min",
        title: "Lab-Grown vs. Natural Diamonds: Everything You Need to Know",
        excerpt: "Chemical, physical, and optical identicals. We break down the science and the sentiment between these two brilliant choices.",
        image: "https://image.brilliantearth.com/cdn-cgi/image/width=1156,height=1340,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F04eb4674a8974b53b595cd73588e7b19",
        content: `
            <p>The most common question we get today is: "Is a lab-grown diamond a real diamond?" The short answer is a resounding yes. But to choose the one that's right for you, it helps to understand how they differ.</p>
            
            <h3>The Science of Brilliance</h3>
            <p>Lab-grown diamonds are created by mimicking the conditions under which diamonds form in the earth. Whether through High Pressure High Temperature (HPHT) or Chemical Vapor Deposition (CVD), the result is a stone with the exact same crystal structure as a natural diamond.</p>
            
            <h3>The Sentiment of Time</h3>
            <p>For some, the appeal of a natural diamond lies in its epic history—formed billions of years ago. It represents a piece of Earth's story. For others, the lab-grown diamond represents the cutting edge of human innovation and a lighter environmental touch.</p>
            
            <img src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1200" alt="Diamond Laboratory" class="my-12 rounded-sm" />
            
            <h3>Which One is Right for You?</h3>
            <p>Ultimately, the choice comes down to your personal priorities. Both options offer the same hardness, durability, and fire. One is a miracle of nature; the other is a miracle of science.</p>
        `
    }
];
