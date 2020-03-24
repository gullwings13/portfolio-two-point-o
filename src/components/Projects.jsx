import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItchIo } from '@fortawesome/free-brands-svg-icons'

import ProjectCard from './ProjectCard'

const projects = [
    {
        title: "Yay!Walker",
        image: "yaywalker.png",
        description: <React.Fragment>
            User submitted walking tours. Ruby on Rails backend with React frontend.
        </React.Fragment>,
        tags: ["react", "javascript", "tailwindcss", "css", "rubyonrails", "restfulapi"],
        github: "https://github.com/gullwings13/yay-walker",
        livesite: <React.Fragment>
            Visit<a className="link-pink font-serif text-center" href="https://aqueous-fortress-10362.herokuapp.com/" >Heroku</a>
        </React.Fragment>
    },
    {
        title: "VR Prototype",
        image: "vrprototype.png",
        description: <React.Fragment>
            This VR prototype explores different firing mechanics. Watch a quick gameplay video below.
        </React.Fragment>,
        tags: ["unity", "vr", "game"],
        github: null,
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://tsh.itch.io/vrprototype" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>
    },
    {
        title: "Polymino Gardens",
        image: "polyminogardens.png",
        description: <React.Fragment>
            A puzzle game featuring an animated UI and procedural gardens. Download for PC and MAC at below
        </React.Fragment>,
        tags: ["unity", "procedural", "game"],
        github: null,
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://tsh.itch.io/polyminogardens" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>
    },
    {
        title: "Space Jump Fun",
        image: "spacejumpfun.png",
        description: <React.Fragment>
            A 2d platformer using c# interfaces.
        </React.Fragment>,
        tags: ["unity", "interfaces", "game"],
        github: null,
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://tsh.itch.io/space-jump-fun" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>
    },
    {
        title: "Witchsword",
        image: "witchsword.png",
        description: <React.Fragment>
            The beginnings of an action RPG exploring VR elements.
        </React.Fragment>,
        tags: ["unity", "vr", "ai", "game"],
        github: null,
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://tsh.itch.io/witchswordv2" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>
    },
    {
        title: "Stoc Play",
        image: "stocplay.png",
        description: <React.Fragment>
            Trade virtual stock to gain confidence in stock trading. Built with Javascript, HTML and CSS. Features API request caching and works in conjunction with cloudflare worker to proxy API requests.
        </React.Fragment>,
        tags: ["javascript", "css", "restfulapi"],
        github: "https://github.com/gullwings13/stoc-play",
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://gullwings13.github.io/stoc-play/" >Livesite</a>
        </React.Fragment>
    },
    {
        title: "Rick and Morty Trading Game",
        image: "rmtradinggame.png",
        description: <React.Fragment>
            Trade exotic goods while you explore the Rick and Morty Multiverse.
        </React.Fragment>,
        tags: ["react", "javascript", "css", "restfulapi", "game"],
        github: "https://github.com/gullwings13/rm-trading-game",
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="http://trev-rm-trading-game.surge.sh/" >Surge</a>
        </React.Fragment>
    },
    {
        title: "NJ Transit Mobile",
        image: "njtransit.png",
        description: <React.Fragment>
            UX and SEI Collaboration, taking UX Wireframes and building a functional prototype with full CRUD as a team.
        </React.Fragment>,
        tags: ["react", "javascript", "express", "sequlize", "restfulapi"],
        github: "",
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://nj-transit-mobile.herokuapp.com/" >Heroku</a>
        </React.Fragment>
    },
    {
        title: "Portfolio",
        image: "portfolio.png",
        description: <React.Fragment>
            Performant Gatsby.js static site featuring video landing and dynamic project filtering. You are here right now!
        </React.Fragment>,
        tags: ["gatsby", "react", "javascript", "tailwindcss", "css"],
        github: "https://github.com/gullwings13/portfolio-two-point-o",
        livesite: ""
    },
    {
        title: "Tic Tac Toe",
        image: "tictactoe.png",
        description: <React.Fragment>
            Tic tac toe featuring recursive minimax AI algorithm.
        </React.Fragment>,
        tags: ["javascript", "css", "ai"],
        github: "https://github.com/gullwings13/tic-tac-toe",
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://gullwings13.github.io/tic-tac-toe/" >Livesite</a>
        </React.Fragment>
    },
    {
        title: "Weather App",
        image: "weather.png",
        description: <React.Fragment>
            Javscript weather app, querying the open weather API and rendering the results. Live site
        </React.Fragment>,
        tags: ["javascript", "css", "restfulapi"],
        github: "https://github.com/gullwings13/weather-app",
        livesite: <React.Fragment>
            Visit <a className="link-pink font-serif text-center" href="https://gullwings13.github.io/weather-app/" >Livesite</a>
        </React.Fragment>
    }
]

const getHastags = (array) =>
{
    let allHashTags = []
    array.forEach(element =>
    {
        allHashTags = allHashTags.concat(element.tags)
    })
    const uniqueSet = new Set(allHashTags)
    return [...uniqueSet]
}

const uniqueHashtags = getHastags(projects)

export default class Projects extends Component
{

    state = {
        projects: [],
        filter: null
    }

    shuffleArray = (array) =>
    {
        for (let i = array.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
    }

    filterArray = (filter) =>
    {
        let newArray = projects.filter(element =>
        {
            let match = false
            element.tags.forEach(tag =>
            {
                if (tag === filter)
                    match = true
            })
            return match
        })
        this.setState({
            projects: newArray,
            filter: filter
        })
    }

    resetArray = () =>
    {
        this.setState({
            projects: projects,
            filter: null
        })
    }

    componentDidMount()
    {
        this.shuffleArray(projects)
        this.setState({
            projects: projects,
            filter: null
        })
    }

    render()
    {
        return (
            <React.Fragment>
                <div>Filter by tech</div>
                <div className="flex flex-wrap font-mono text-sm justify-center">
                    <button className="link-pink" onClick={() => { this.resetArray() }}>All</button>
                    {uniqueHashtags.map((hashtag, index) => (
                        <button key={index} className="link-pink capitalize mx-1" onClick={() =>
                        {
                            this.filterArray(hashtag.toLowerCase())
                        }}>{hashtag}</button>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center">

                    {this.state.projects.map((project, index) => (
                        <ProjectCard key={index} project={project} randomRotation={this.props.randomRotation} />
                    ))}


                </div>


            </React.Fragment>

        )
    }
}