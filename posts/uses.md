---
title: "Uses"
summary: "A post about software and hardware that I use."
author: "Moskas"
date: "15 Nov 2023 00:37:21"
tags: ["Software", "Nix", "Hardware"]
---
This is a short list of my hardware and software that I use on day to day basis.  

[[toc]]

# General Computing




## Desktop - Cheshire

The heart of my home setup, it&rsquo;s a desktop that I&rsquo;ve build in early 2022. As I&rsquo;m somewhat of a gamer and hobbyist developer the computer is fit with the Ryzen 7 5800x and NVIDIA RTX 3070 with 16GB of DDR4 ram. That way I can have decent performance in games and not too long compile times.  
I&rsquo;m using Linux, NixOS exactly. I can&rsquo;t complain about it, even my NVIDIA GPU isn&rsquo;t an issue for me while majority of Linux users complain about NVIDIA and their driver.  




## Laptop - Roon

My laptop that for a couple of years was my main computer but now acts as a secondary *&ldquo;mobile&rdquo;* solution. I&rsquo;m using the mobile loosely here as it is a gaming laptop with i7 8750H and GTX 1070Maxq. The battery life on it is really really bad. If I&rsquo;m able to use it for over an hour of full use with my tweaks it&rsquo;s a pure luck.  
Other than that it has really loud fans if you don&rsquo;t limit the cpu clocks and undervolt it. The default cpu settings likes to go as fast as they can and they only slightly care about the 100C temps.  
The laptop runs on NixOS as well, in fact it was my first device that I&rsquo;ve converted to Nix.  




## Home-server - Laffey

My recently repurposed old pc that I use to host my desktop backups, Forgejo for my local git solution and Jellyfin to stream media in the local network.  
It&rsquo;s not a powerful machine by todays standards as it has just i5 4690, 16GB of DDR3 ram and GTX 960 2GB for transcoding videos on Jellyfin. It&rsquo;s not power efficient nor has a lot of storage but it was all done with my spare parts so it is what it is. Someday I&rsquo;ll replace it with a proper NAS like solution.  
As every other computer of mine it&rsquo;s running on NixOS as well.  




# Mobile Computing




## Smartphone - Boise

For the smartphone I&rsquo;m using Google&rsquo;s Pixel 6 due to it&rsquo;s open nature and the ability to install GrapheneOS on it *(arguably I still haven&rsquo;t installed it but I will, someday)*.  
I&rsquo;ve used to play gacha games daily but nowadays I&rsquo;m rarely using it for anything other than just connecting with people or looking up information.  
I try to use mainly open source apps from F-Droid as I find them the best for my needs and at the same time I can skip all the bloatware and adware from Google Store.  




## E-reader - Dewey

For reading books and mangas I&rsquo;m using Boox Leaf 2. It&rsquo;s my first ever e-ink device and it is on the lower end of the spectrum in terms of performance and it&rsquo;s screen *(mainly it&rsquo;s refresh rate)*.  
But overall it&rsquo;s a good device and most importantly it runs on pure Android, not a proprietary locked down system like Amazon Kindle devices or any other e-reader that I can easily buy in my country. I&rsquo;ve written about it in the past when I was playing around with termux.  




# Peripherals




## Monitor

I only have one monitor that I use with my desktop, it&rsquo;s a 144Hz Acer Predator &#x2026;. It&rsquo;s Gsync compatible and on paper has HDR support but it&rsquo;s not good and as of now I still can&rsquo;t use it as I&rsquo;m using Linux and X11.  
It also doubles down as my speakers as my old speakers died *( to be precise the subwoofer gave up and it was a center connecting piece for 5 other speakers)*.  




## Headphones

On the topic of speakers, I&rsquo;m using two pair of headphones. Wired on my desktop, and wireless with my mobile phone.  




### Wired

As for the wired headphones I&rsquo;m using ISK HD9999 monitor headphones.  
They have a good audio quality and thanks to them being monitor headphones they aren&rsquo;t tuned to any specific frequency and rather are tuned to be as flat as possible.  
Any audio boosting or tweaking I can just do with a software and from my experience it&rsquo;s a much better solution than relying on preconfigured manufacturers sound profiles.  




### Wireless

The wireless earbuds are JBL Endurance Run 2, they are alright. Have a decent battery life. They are a sport headphones so they have a strap connecting left and right earphone thanks to that I don&rsquo;t have to worry about them falling out and loosing them.  




## Keyboard(s)

Currently I&rsquo;m using my old HyperX Alloy FPS Pro TKL with Cherry MX Red switches but I do plan to buy a new keyboard as I have mentioned in my other blog post (link).  
My second keyboard that I don&rsquo;t use currently due to key chatter is Anne Pro 2 with Gateron Blues. It&rsquo;s a keyboard that I really like thanks to it&rsquo;s 60% form factor and it&rsquo;s clicky switches. Sadly due to lack of tools *(soldering station)* and spare switches it&rsquo;s waiting for a better times.  




## Mouse

I&rsquo;m using a Steelseries (don&rsquo;t remember the model name fill). It&rsquo;s a regular gamer rgb mice that just fits my hand and has a proper OpenRGB support so it&rsquo;s all I need.  




# Software




## Graphical Environment

I&rsquo;m using qtile with X11 backend. I enjoy it&rsquo;s configuration capabilities thanks to the fact that it uses actual programming language be it Python. I&rsquo;ve been using it both on my laptop and my desktop and I&rsquo;m still waiting to find a proper replacement for it with wayland. I know that qtile has a wayland backend but I&rsquo;ve never had any luck with it on my system, but that might be due to NVIDIA gpus.  




## Text Editor

My main editor of choice is Emacs, I really enjoy it&rsquo;s looks and convenience. I&rsquo;ve got a scratchpad on my system with Emacs client opened almost all the time.  
I&rsquo;ve tried (neo)vim in the past as my main editor but Emacs was a lot better for me.  
I&rsquo;m currently using [doom-emacs](https://github.com/doomemacs/doomemacs) with my [config](https://github.com/Moskas/emacs-config) but I plan to write my own configuration some time.  




## Web browser

I&rsquo;m mainly using Firefox, as I&rsquo;m trying to support the open web as much as possible.  
I&rsquo;ve used to daily drive Brave browser thanks to it&rsquo;s built in adblock and script blocker but some time ago I&rsquo;ve switched from it as Firefox was more open and had better support for certain things like custom CSS, libredirect and such.  
I sometimes also use qutebrowser as I do like it&rsquo;s vim keybindings and scripting capabilities but some websites aren&rsquo;t rendering properly on it and it&rsquo;s not updated as often as &ldquo;the mainline&rdquo; browsers so it&rsquo;s a very situational choice for me.  




## RSS

For reading news, following podcasts or new video uploads I&rsquo;m using newsboat. It&rsquo;s simple and scriptable application that is also TUI based. On top of that it has full support in nix home-manager configuration so I can easily have every feed (albeit without history) on my device no mather what I would use.  
Additionally on my phone I also have installed Read You, it&rsquo;s a material you Android RSS reader that has customization options and overall it&rsquo;s nice to use.  




## Music Player

On my desktop and laptop I&rsquo;m using mpd with ncmpcpp. For me it&rsquo;s the best solution to listen to and manage your music library.  


