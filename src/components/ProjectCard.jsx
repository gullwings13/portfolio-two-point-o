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
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 project-card">

            <ProjectImage
                className="w-full h-48 object-cover object-left-top translate-z-20px preserve-3d"
                src={image}
                alt={title} />
            <div className="px-4 py-4 h-32 xl:h-48">
                <div className="font-bold text-indigo-200 text-lg mb-2 translate-z-20px">{title}</div>
                <p className="text-gray-300 text-sm text-justify">
                    {description}
                </p>
            </div>
            <div className="flex text-xs h-16">
                <div className="px-1 py-1 flex flex-col w-1/6 items-center justify-end">
                    {github ? <a className="link-pink font-serif" href={`${github}`}>GitHub</a> : ""}
                </div>
                <div className="px-1 py-1 w-4/6 h-16 flex justify-center items-start flex-wrap-reverse">
                    {hashtags(tags)}
                </div>
                <div className="px-1 py-1 flex flex-col w-1/6 items-center justify-end">
                    {livesite}
                </div>
            </div>
        </Tilt>

    )
}
