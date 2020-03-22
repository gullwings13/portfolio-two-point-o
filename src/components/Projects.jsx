import React, { Component } from 'react'
import spacejumpfun from '../images/spacejumpfun.png'
import polymino from '../images/polyminogardens.png'
import vrprototype from '../images/vrprototype.png'
import witchsword from '../images/witchsword.png'
import stocplay from '../images/stocplay.png'
import rmtradinggame from '../images/rmtradinggame.png'
import njtransit from '../images/njtransit.png'
import yaywalker from '../images/yaywalker.png'
import ProjectCard from './ProjectCard'


const projects = [
    {
        title: "Space Jump Fun",
        image: spacejumpfun,
        description: `A simple platformer making use of c# interfaces. Give it a try on <a className="font-bold" href="https://tsh.itch.io/space-jump-fun" ><span className="text-purple-600 hover:underline">itch.io <i className="fab fa-itch-io text-purple-600"></i></span></a>`,
        tags: ["#csharp", "#unity", "#interfaces"]
    }
]


export default class Projects extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <div className="text-2xl mt-4 text-justify">I have been making my own prototypes and games for the last several years in my spare time.

                </div>
                <div className="flex flex-wrap justify-center">

                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}

                    {/* <div className="project-card">
                        <img className="w-full h-48" src={spacejumpfun} alt="Space Jump Fun" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Space Jump Fun</div>
                            <p className="text-gray-700 text-base">
                                A simple platformer making use of c# interfaces. Give it a try on <a
                                    className="font-bold"
                                    href="https://tsh.itch.io/space-jump-fun">
                                    <span className="text-purple-600 hover:underline">itch.io <i className="fab fa-itch-io text-purple-600"></i></span></a></p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#csharp</span>
                            <span className="hashtag">#unity</span>
                            <span className="hashtag">#interfaces</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48" src={polymino} alt="Polymino Gardens" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Polymino Gardens</div>
                            <p className="text-gray-700 text-base">
                                A puzzle game featuring an animated UI and procedural gardens. Download for PC and MAC at <a
                                    className="font-bold"
                                    href="https://tsh.itch.io/polyminogardens">
                                    <span className="text-purple-600 hover:underline">itch.io <i className="fab fa-itch-io text-purple-600"></i></span></a></p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#csharp</span>
                            <span className="hashtag">#unity</span>
                            <span className="hashtag">#ui</span>
                            <span className="hashtag">#procedural</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48" src={vrprototype} alt="VR Prototype" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">VR Prototype</div>
                            <p className="text-gray-700 text-base">
                                This VR prototype explores different firing mechanics. Watch a quick gameplay video on <a
                                    className="font-bold"
                                    href="https://tsh.itch.io/vrprototype">
                                    <span className="text-purple-600 hover:underline">itch.io <i className="fab fa-itch-io text-purple-600"></i></span></a></p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#csharp</span>
                            <span className="hashtag">#unity</span>
                            <span className="hashtag">#vr</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48" src={witchsword} alt="Witchsword" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Witchsword</div>
                            <p className="text-gray-700 text-base">
                                The beginnings of an action RPG exploring VR elements <a
                                    className="font-bold"
                                    href="https://tsh.itch.io/witchswordv2">
                                    <span className="text-purple-600 hover:underline">itch.io <i className="fab fa-itch-io text-purple-600"></i></span></a></p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#csharp</span>
                            <span className="hashtag">#unity</span>
                            <span className="hashtag">#vr</span>
                        </div>
                    </div> */}



                    {/* <div className="project-card">
                        <img className="w-full h-48 object-cover object-left-top" src={yaywalker} alt="Yaywalker" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Yay!Walker</div>
                            <p className="text-gray-700 text-base">
                                User submitted walking tours. Backend
                                using Ruby on Rails and Frontend crafted in React. A live version can be found <a
                                    className="font-bold"
                                    href="https://aqueous-fortress-10362.herokuapp.com/">here</a> </p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#rubyonrails</span>
                            <span className="hashtag">#react</span>
                            <span className="hashtag">#tailwindcss</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48 object-cover object-left-top" src={rmtradinggame} alt="Rick and Morty Trading Game" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Rick and Morty Trading Game</div>
                            <p className="text-gray-700 text-base">
                                Trade exotic goods while you explore the Rick and Morty Multiverse, try it out <a
                                    className="font-bold"
                                    href="http://trev-rm-trading-game.surge.sh/">here</a> </p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#react</span>
                            <span className="hashtag">#rest</span>
                            <span className="hashtag">#json</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48 object-cover object-left-top" src={stocplay} alt="StocPlay" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">StocPlay</div>
                            <p className="text-gray-700 text-base">
                                Trade virtual stocks to become more confident in the stock market. Live version <a
                                    className="font-bold"
                                    href="https://pages.git.generalassemb.ly/tsholbourn/stock-trader/">here</a> </p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#html</span>
                            <span className="hashtag">#css</span>
                            <span className="hashtag">#javascript</span>
                        </div>
                    </div> */}

                    {/* <div className="project-card">
                        <img className="w-full h-48 object-cover object-left-top" src={njtransit} alt="NJ Transit" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">NJ Transit</div>
                            <p className="text-gray-700 text-base">
                                UX and SEI Collaboration, taking UX Wireframes and building a functional prototype with full CRUD as a team. See the live version <a
                                    className="font-bold"
                                    href="https://nj-transit-mobile.herokuapp.com/">here</a> </p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="hashtag">#express</span>
                            <span className="hashtag">#sequlize</span>
                            <span className="hashtag">#react</span>
                        </div>
                    </div> */}
                </div>


            </React.Fragment>

        )
    }
}
