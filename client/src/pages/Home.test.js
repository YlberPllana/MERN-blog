import React from "react";
import { render } from "@testing-library/react";
//import Comments from "./Comments";
import Home from "./Home";

describe.skip('My first test', ()=>{
    const user = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4NzFmY2I3NTJjYWIyMzY0N2Q0YTQiLCJ1c2VybmFtZSI6InlsYmVyIiwiaWF0IjoxNjYzNTk1MDA5LCJleHAiOjE2NjM1OTg2MDl9.tY5EMU1qL8r6KzRFs_vGbj6VpvbLsvysWkZHYY2JRGM","user":{"_id":"632871fcb752cab23647d4a4","username":"ylber"},"message":"Successfully signed in."};
    const posts = [{
 author: {_id: '6284245ea3a74f439fbaebd7', username: 'testing', password: '$2a$10$wsdmgQkJd4IjP0C/hRioIOlIYwFnJWBNngwoDb6e6r9WPXfew.ZeW', __v: 0},
body: "In the science fiction movies I grew up watching, showing a robot was one of the fastest ways in storytelling to say, “OK, this is a story about the future.”\n\nIn reality, many of us already have a robot vacuum in the house and hardly even think about it. But robots can do a whole lot more than that, and it’s obvious we’ll have more around us soon. Robots are really just computers that can go more places and do more things. They’ll change how we mow our lawns, how we shovel snow (I’m in Canada) and how we get from place to place by land, air, sea or rocket.\n\nTo get a glimpse at what’s coming, look at where robots already are. You expect to see drones outside inspecting things like wind turbines, power lines and bridges. But, they’re coming inside, too. Companies like Verity are using indoor drones to autonomously scan barcodes for inventory management. Companies like Lowes and Pizza Hut are looking at the FedEx SameDay Bot for its potential to make autonomous deliveries.\n\nIt’s not hard to imagine how it might work with robots end-to-end. Think about your prescriptions. Order online by phone or on your app. Robots at the pharmaceutical distribution center pick and pack, and then a delivery robot scoots off to your house and texts you when it arrives. The whole time, you’ve been the only human in the process. As Ahti Heinla, CEO of Starship Technologies said, delivery is “the largest unautomated industry in the world.”\n\nIn my example, it’s all individual robots, but actually, robots think best as swarms. Whatever one learns gets fed back to the server. This builds an instant holistic view and makes every robot smarter.",
date: "2022-06-01T03:26:22.372Z",
// imageUrl: "https://images.adsttc.com/media/images/5ffb/da4b/63c0/17e1/6200/021c/large_jpg/0361_1_fp722449.jpg?1610340923",
published: true,
title: "A robot thing",
__v: 0,
_id: "6289530650732661a9836a5f"
    }]
test('should return a container', async ()=>{
      render
      (<Home user={user}
        posts = {posts} />)
})})