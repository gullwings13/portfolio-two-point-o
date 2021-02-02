import React from 'react'
import Tilt from 'react-parallax-tilt'
import ProjectImage from './projectImage'


export default function ProjectCard(props)
{
    const { title, image, description, tags, github, livesite } = props.project
    const hashtags = (tags) =>
    (
        tags.map((tag, index) => (
            <span key={index} className="hashtag h-5">{`#${tag}`}</span>
        ))
    )

    return (
        <Tilt
            tiltAngleXInitial={0}
            tiltAngleYInitial={0}
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.1}
            gyroscope={true}
            className=" w-full mx-3 xs:w-72 sm:mx-5 xl:w-80  project-card hover:border-pink-600">

            <div className="rounded-sm bg-pink-400">
                <a href={livesite}
                    target="_blank"
                    rel="noopener noreferrer"
                ><ProjectImage
                        className="object-top w-full h-32 rounded-sm object-cover border-gray-800 border hover:opacity-75 hover:border-pink-600"
                        src={image}
                        objectPosition={`50% 0%`}
                        alt={title} /></a>
            </div>
            <div className="px-2 py-1 h-32 text-left">
                <a className="link-pink font-bold font-serif mb-2 text-lg" target="_blank" rel="noopener noreferrer" href={livesite}>
                    {title}
                </a>
                <p className="text-white text-sm font-light text-justify">
                    {description}
                </p>
            </div>
            <div className="flex justify-between text-xs h-20">
                <div className="px-1 py-1 flex flex-col w-1/3 md:w-2/12 items-center justify-end">
                    {github ? <a className="link-pink font-serif text-center" target="_blank" rel="noopener noreferrer" href={`${github}`}>Visit GitHub</a> : ""}
                </div>
                <div className="hidden md:flex px-1 py-1 w-8/12 h-20 justify-center flex-wrap content-end">
                    {hashtags(tags)}
                </div>
                <div className="px-1 py-1 flex flex-col w-1/3 md:w-2/12 items-center justify-end">
                    {livesite ? <a className="link-pink font-serif text-center" target="_blank" rel="noopener noreferrer" href={`${livesite}`}>Visit Website</a> : ""}
                </div>
            </div>
        </Tilt>

    )
}
