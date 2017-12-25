#!/bin/bash

# Specifying the icon(s) in the script
# This allows us to change its appearance conditionally
iconPlay=" "
iconStop=" "
iconPause=" "

player_status=$(playerctl status 2> /dev/null)
if [[ $? -eq 0 ]]; then
    metadata="$(playerctl metadata artist) - $(playerctl metadata title)"
fi

# Foreground color formatting tags are optional
if [[ $player_status = "Playing" ]]; then
    echo "%{F#FFF} $iconPlay $metadata"       # White when playing
elif [[ $player_status = "Paused" ]]; then
    echo "%{F#BB97C1} $iconPause $metadata"       # Violet when paused
else
    echo "%{F#414BF9}$icontop"                 # Violet stop icon when stopped
fi
