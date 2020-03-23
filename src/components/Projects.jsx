import React, { Component } from 'react'
import spacejumpfun from '../images/spacejumpfun.png'
import polymino from '../images/polyminogardens.png'
import vrprototype from '../images/vrprototype.png'
import witchsword from '../images/witchsword.png'
import stocplay from '../images/stocplay.png'
import rmtradinggame from '../images/rmtradinggame.png'
import njtransit from '../images/njtransit.png'
import yaywalker from '../images/yaywalker.png'
import tictactoe from '../images/tictactoe.png'
import weather from '../images/weather.png'
import portfolio from '../images/portfolio.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItchIo } from '@fortawesome/free-brands-svg-icons'

import ProjectCard from './ProjectCard'


const projects = [
    {
        title: "Yay!Walker",
        image: yaywalker,
        description: <React.Fragment>
            User submitted walking tours. Ruby on Rails backend with React frontend. Deployed to <a className="link-pink font-serif" href="https://aqueous-fortress-10362.herokuapp.com/" >Heroku</a>
        </React.Fragment>,
        tags: ["react", "javascript", "tailwindcss", "css", "rubyonrails", "restfulapi"]
    },
    {
        title: "VR Prototype",
        image: vrprototype,
        description: <React.Fragment>
            This VR prototype explores different firing mechanics. Watch a quick gameplay video on <a className="link-pink font-serif" href="https://tsh.itch.io/vrprototype" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>,
        tags: ["unity", "vr", "game"]
    },
    {
        title: "Polymino Gardens",
        image: polymino,
        description: <React.Fragment>
            A puzzle game featuring an animated UI and procedural gardens. Download for PC and MAC at <a className="link-pink font-serif" href="https://tsh.itch.io/polyminogardens" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>,
        tags: ["unity", "procedural", "game"]
    },
    {
        title: "Space Jump Fun",
        image: spacejumpfun,
        description: <React.Fragment>
            A 2d platformer using c# interfaces. Give it a try on <a className="link-pink font-serif" href="https://tsh.itch.io/space-jump-fun" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>,
        tags: ["unity", "interfaces", "game"]
    },
    {
        title: "Witchsword",
        image: witchsword,
        description: <React.Fragment>
            The beginnings of an action RPG exploring VR elements <a className="link-pink font-serif" href="https://tsh.itch.io/witchswordv2" >itch.io<FontAwesomeIcon icon={faItchIo} /></a>
        </React.Fragment>,
        tags: ["unity", "vr", "ai", "game"]
    },
    {
        title: "Stoc Play",
        image: stocplay,
        description: <React.Fragment>
            Trade virtual stocks to become more confident in the stock market. Live version <a className="link-pink font-serif" href="https://pages.git.generalassemb.ly/tsholbourn/stock-trader/">here</a>
        </React.Fragment>,
        tags: ["javascript", "css", "restfulapi"]
    },
    {
        title: "Rick and Morty Trading Game",
        image: rmtradinggame,
        description: <React.Fragment>
            Trade exotic goods while you explore the Rick and Morty Multiverse, try it out on <a className="link-pink font-serif" href="http://trev-rm-trading-game.surge.sh/" >surge.sh</a>
        </React.Fragment>,
        tags: ["react", "javascript", "css", "restfulapi", "game"]
    },
    {
        title: "NJ Transit Mobile",
        image: njtransit,
        description: <React.Fragment>
            UX and SEI Collaboration, taking UX Wireframes and building a functional prototype with full CRUD as a team. See the live version <a className="link-pink font-serif" href="https://nj-transit-mobile.herokuapp.com/" >here</a>
        </React.Fragment>,
        tags: ["react", "javascript", "express", "sequlize", "restfulapi"]
    },
    {
        title: "Portfolio",
        image: portfolio,
        description: <React.Fragment>
            Performant Gatsby.js static site featuring video landing and dynamic project filtering. You are here right now!
        </React.Fragment>,
        tags: ["gatsby", "react", "javascript", "tailwindcss", "css"]
    },
    {
        title: "Tic Tac Toe",
        image: tictactoe,
        description: <React.Fragment>
            Tic tac toe featuring recursive minimax AI algorithm. Try your hand <a className="link-pink font-serif" href="https://tsh.itch.io/space-jump-fun" >here</a>
        </React.Fragment>,
        tags: ["javascript", "css", "ai"]
    },
    {
        title: "Weather App",
        image: weather,
        description: <React.Fragment>
            Javscript weather app, querying the open weather API and rendering the results. Live site <a className="link-pink font-serif" href="https://tsh.itch.io/space-jump-fun" >here</a>
        </React.Fragment>,
        tags: ["javascript", "css", "restfulapi"]
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
