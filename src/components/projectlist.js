export const projects = [
    // {
    //     title: "Run Alob Run",
    //     image: "alob.png",
    //     description: "Platform puzzler built in the IGA (Indie Game Academy) accelerator by team of 5. Released on IOS and Android.",
    //     tags: ["unity", "UI", "interfaces", "game"],
    //     filters: ["unity/c#"],
    //     github: null,
    //     livesite: "https://play.google.com/store/apps/details?id=com.Rangers.RunAlobRun"
    // },
    // {
    //     title: "The Driving App",
    //     image: "drivingapp.png",
    //     description: "Contributed to Frontend and Backend of existing code base. Added new UI as per UX wire-frames, including color scheme switching and progress bars.",
    //     tags: ["unity", "UI", "fullstack"],
    //     filters: ["unity/c#", "fullstack"],
    //     github: null,
    //     livesite: "https://play.google.com/store/apps/details?id=com.ehsani.drivingapp&hl=en_US&gl=US"
    // },
    {
        title: "Surreal Diamond",
        // Captured from the running game (the Collection gallery, one card per rarity
        // tier). Animated, so it bypasses gatsby-plugin-sharp -- see ProjectMedia.
        media: { src: "/fantasy2.webp", still: "/fantasy2-still.webp" },
        description: "Real MLB and WNBA box scores drive a nightly baseball sim. Lineups lock before first pitch; a cron scores the day and narrates it inning by inning.",
        tags: ["node", "hono", "google-oauth", "posthog", "fullstack", "solo"],
        filters: ["fullstack"],
        github: null,
        livesite: "https://surreal-diamond.vercel.app/"
    },
    {
        title: "Gro.lol",
        image: "grolol.png",
        description: "Rails + React link-in-bio SaaS. Sign up, add links, pick a theme, and your page is live at gro.lol/yourname in under 60 seconds. Auth, theming, solo build.",
        tags: ["rails", "react", "tailwindcss", "fullstack", "solo"],
        filters: ["fullstack"],
        github: null,
        livesite: "https://gro.lol/"
    },
    {
        title: "Sobreviventes do Castelo (SDC)",
        image: "sdc.png",
        description: "Unity 2D horde survivor built for throughput: pooled spawns, data-driven weapon stats, wave scheduling, and an event bus that decouples achievements.",
        tags: ["unity", "game", "work in progress", "team"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://tsh.itch.io/sdc?secret=BFIP4Pvqf6RWVGDCymKzLmA5lw"
    },
    {
        title: "Music Videos!",
        image: "musicvisualization.png",
        description: "Music videos rendered from custom Unity systems — procedural swarms and visuals driven live off the track's audio spectrum.",
        tags: ["unity", "procedural", "music video", "solo"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://www.youtube.com/watch?v=4GZLGuDKaWs"
    },
    {
        title: "The Squire",
        image: "thesquire.png",
        description: "Led a five-person team to a second-place finish. Owned scope and production as producer while writing the gameplay code as lead programmer.",
        tags: ["unity", "game", "team"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://igahouseranger.itch.io/the-squire"
    },
    {
        title: "Polymino Gardens",
        image: "polyminogardens.png",
        description: "Polyomino tile-matching puzzler with procedurally generated gardens, a fully animated UI, and pooled tiles to keep allocation flat.",
        tags: ["unity", "procedural", "game", "solo"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://tsh.itch.io/polyminogardens"
    },
    {
        title: "Orbital Simulation",
        image: "orbital.png",
        description: "N-body orbital toy in Unity DOTS/ECS running hundreds of thousands of bodies at interactive framerate. Shipped via Unity Cloud Build.",
        tags: ["unity", "ECS/DOTS", "toy", "solo"],
        filters: ["unity/c#"],
        github: "https://github.com/gullwings13/legendary-octo-guacamole",
        livesite: "https://tsh.itch.io/orbital-simulation"
    },
    {
        title: "VR Prototype",
        image: "vrprototype.png",
        description: "SteamVR prototype benchmarking firing mechanics against each other to find what actually reads as good in a headset.",
        tags: ["unity", "vr", "game", "solo"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://tsh.itch.io/vrprototype"
    },
    {
        title: "Space Jump Fun",
        image: "spacejumpfun.png",
        description: "2D platformer built on C# interfaces so movement, hazards and pickups stay swappable. Tuned around deliberately floaty jump physics.",
        tags: ["unity", "interfaces", "game", "solo"],
        filters: ["unity/c#"],
        github: null,
        livesite: "https://tsh.itch.io/space-jump-fun"
    },
    // {
    //     title: "Witch Sword",
    //     image: "witchsword.png",
    //     description: "Action RPG exploring VR elements and platforming game-play.",
    //     tags: ["unity", "vr", "ai", "game"],
    //     filters: ["unity/c#"],
    //     github: null,
    //     livesite: "https://tsh.itch.io/witchswordv2"
    // },
    // {
    //     title: "Brood Battle",
    //     image: "broodbattle.png",
    //     description: "Realtime multiplayer, multi-room quiz game using socket.io. Tested with artillery.io.",
    //     tags: ["react", "javascript", "tailwindcss", "expressjs", "socket.io"],
    //     filters: ["fullstack"],
    //     github: null,
    //     livesite: "https://brood-battle.netlify.app/"
    // },
    // {
    //     title: "ParkSafe",
    //     image: "parksafe.png",
    //     description: "NYC Park Safety rating concept site. Lazy loading for images, custom API and backend ratings calculations.",
    //     tags: ["react", "tailwindcss", "rubyonrails"],
    //     filters: ["fullstack"],
    //     github: "https://github.com/gullwings13/covidparkappbackend",
    //     livesite: "https://parksafe.netlify.app/"
    // },
    {
        title: "Fetch",
        image: "fetch.png",
        description: "Internal company directory with realtime chat. 🏆 Winning entry, May 2020 GA/DataDog hackathon — team of five, Rails API and React client.",
        tags: ["react", "javascript", "tailwindcss", "rubyonrails", "team"],
        filters: ["fullstack"],
        github: "https://github.com/ehighberg/fetch",
        livesite: null
    },
    {
        title: "Multiverse Trading Game",
        image: "rmtradinggame.png",
        description: "React single-page trading sim: hop between worlds, buy exotic goods low, sell into the spread. Client-side state over a REST API.",
        tags: ["react", "javascript", "css", "restfulapi", "solo"],
        filters: ["frontend"],
        github: "https://github.com/gullwings13/rm-trading-game",
        livesite: "http://trev-rm-trading-game.surge.sh/"
    },
    {
        title: "Tic Tac Toe",
        image: "tictactoe.png",
        description: "Tic tac toe with local multiplayer and an unbeatable AI — recursive minimax searching the full game tree.",
        tags: ["javascript", "css", "ai", "solo"],
        filters: ["frontend"],
        github: "https://github.com/gullwings13/tic-tac-toe",
        livesite: "https://gullwings13.github.io/tic-tac-toe/"
    },
    // {
    //     title: "The X-Effect",
    //     image: "xeffect.png",
    //     description: "Motivational and productivity habit building system, built by team of two. Backend built using Node, Express and MongoDB.",
    //     tags: ["react", "mongodb", "tailwindcss", "express"],
    //     filters: ["fullstack"],
    //     github: "https://github.com/Khimarra/the-x-effect",
    //     livesite: "https://thexeffect.netlify.app/"
    // },
    {
        title: "Paprika.Studio",
        image: "paprikastudio.png",
        description: "Custom Gatsby blog that builds pages straight from markdown at compile time, with an automatic dark theme.",
        tags: ["gatsby", "react", "javascript", "solo"],
        filters: ["frontend"],
        github: null,
        livesite: "https://test-1122334455.netlify.app/"
    },

    // {
    //     title: "Yay!Walker",
    //     image: "yaywalker.png",
    //     description: "User submitted walking tours. Ruby on Rails backend with React frontend.",
    //     tags: ["react", "javascript", "tailwindcss", "rubyonrails"],
    //     filters: ["fullstack"],
    //     github: "https://github.com/gullwings13/yay-walker",
    //     livesite: "https://aqueous-fortress-10362.herokuapp.com/"
    // },

    // {
    //     title: "Stoc Play",
    //     image: "stocplay.png",
    //     description: "Trade virtual stock to gain confidence. Built with Javascript, HTML and CSS. Features API request caching and cloudflare worker to proxy API requests.",
    //     tags: ["javascript", "css", "restfulapi"],
    //     filters: ["frontend"],
    //     github: "https://github.com/gullwings13/stoc-play",
    //     livesite: "https://gullwings13.github.io/stoc-play/"
    // },

    // {
    //     title: "NJ Transit Mobile",
    //     image: "njtransit.png",
    //     description: "UX and Engineering Collaboration, transforming UX wire-frames into a functional full stack prototype as a team.",
    //     tags: ["react", "javascript", "express", "postgreql"],
    //     filters: ["fullstack"],
    //     github: null,
    //     livesite: "https://nj-transit-mobile.herokuapp.com/"
    // },
    // {
    //     title: "Weather App",
    //     image: "weather.png",
    //     description: "Javascript weather app using open weather API with local storage.",
    //     tags: ["javascript", "css", "restfulapi"],
    //     filters: ["frontend"],
    //     github: "https://github.com/gullwings13/weather-app",
    //     livesite: "https://gullwings13.github.io/weather-app/"
    // },
    {
        title: "Portfolio",
        image: "portfolio.png",
        description: "The site you're on. Gatsby static build, GraphQL image pipeline emitting responsive WebP, and client-side project filtering.",
        tags: ["gatsby", "javascript", "tailwindcss", "graphql", "solo"],
        filters: ["frontend"],
        github: "https://github.com/gullwings13/portfolio-two-point-o",
        livesite: null
    },

]