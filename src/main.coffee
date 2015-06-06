# This is the entry point of our code.

# Allows defining of properties on classes.
# It is a little sketchy and may disappear soon.
Function::property = (prop, desc) ->
  Object.defineProperty this.prototype, prop, desc

FPSCounter = require 'util/FPSCounter'
Game = require 'core/Game'
Racer = require 'racer/Racer'
PlayerRacerController = require 'racer/PlayerRacerController'
CameraController = require 'CameraController'
Ground = require 'Ground'
Pixi = require 'pixi.js'
Race = require 'race/Race'

window.onload = ->
  console.log "loading..."
  Pixi.loader.add('images/ground.jpg')
  Pixi.loader.load ->
    console.log 'loader finished'
    start()

start = ->
  console.log "ready to go"
  window.game = game = new Game()
  racer = new Racer([0, 0])
  racer2 = new Racer([0, -15])
  racerController = new PlayerRacerController(racer)
  cameraController = new CameraController(racer, game.camera)

  game.addEntity(racer)
  game.addEntity(racer2)
  game.addEntity(racerController)
  game.addEntity(cameraController)
  game.addEntity(new Ground())

  race = new Race()
  race.addRacer(racer)
  # race.addRacer(racer2)
  race.addWaypoint([10, 10])
  race.addWaypoint([50, 10])
  race.addWaypoint([70, -10])
  game.addEntity(race)
  
  game.start()