import React from 'react'
import Tilt from 'react-parallax-tilt'
import ProjectImage from './projectImage'


export default function ProjectCard(props)
{
    const { title, image, description, tags, github, livesite } = props.project
    const hashtags = (tags) =>
        (
            tags.map((tag, index) => (
                <span key={index} className="hashtag h-5 translate-z-20px">{`#${tag}`}</span>
            ))
        )

    return (
        <Tilt
            tiltAngleXInitial={7}
            tiltAngleYInitial={7}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.03}
            gyroscope={true}
            className="w-full mx-10 sm:mx-20 md:w-1/2 lg:w-1/3 xl:w-1/4 project-card hover:border-pink-600">

            <div className="rounded-sm bg-indigo-400">
                <a href={livesite}><ProjectImage
                    className="w-full h-48 rounded-sm object-cover object-left-top border-gray-800 border hover:opacity-75 hover:border-pink-600"
                    src={image}
                    alt={title} /></a>
            </div>
            <div className="px-4 py-4 h-32 xl:h-48">
                <a href={livesite}>
                    <div className="font-bold text-indigo-200 text-lg mb-2 translate-z-20px hover:underline">
                        {title}
                    </div>
                </a>
                <p className="text-gray-300 text-sm text-justify">
                    {description}
                </p>
            </div>
            <div className="flex text-xs h-16">
                <div className="px-1 py-1 flex flex-col w-1/6 items-center justify-end">
                    {github ? <a className="link-pink font-serif text-center" href={`${github}`}>Visit GitHub</a> : ""}
                </div>
                <div className="px-1 py-1 w-4/6 h-16 flex justify-center items-start flex-wrap-reverse">
                    {hashtags(tags)}
                </div>
                <div className="px-1 py-1 flex flex-col w-1/6 items-center justify-end">
                    {livesite ? <a className="link-pink font-serif text-center" href={`${livesite}`}>Visit Project</a> : ""}
                </div>
            </div>
        </Tilt>

    )
}
