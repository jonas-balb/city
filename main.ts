let Rh = 0
let soil_moisture = 0
let ulrasonic_distance = 0
let water_level = 0
let Temp = 0
OLED.init(128, 64)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    Temp = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    basic.pause(5000)
    water_level = Environment.ReadWaterLevel(AnalogPin.P0)
    ulrasonic_distance = Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P3)
    soil_moisture = Environment.ReadSoilHumidity(AnalogPin.P7)
    Rh = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    basic.pause(5000)
    OLED.clear()
    OLED.writeStringNewLine("RH" + "RH")
    OLED.writeStringNewLine("Temp" + "Temp")
    OLED.writeStringNewLine("soil moistere:" + soil_moisture)
    if (Temp < 14 || Temp > 24) {
        Environment.ledBrightness(AnalogPin.P2, true)
        Environment.ledBrightness(AnalogPin.P5, false)
        Environment.ledBrightness(AnalogPin.P4, true)
        if (water_level > 0) {
            basic.showLeds(`
                . # # # .
                . . # . .
                . # # # .
                . . # . .
                . . # . .
                `)
            pins.servoWritePin(AnalogPin.P6, 180)
        }
        if (soil_moisture < 60) {
            basic.showLeds(`
                . . . . #
                . . . # #
                # . # # .
                # # # . .
                # # . . .
                `)
            pins.servoWritePin(AnalogPin.P6, 90)
        }
        if (ulrasonic_distance > 10 && ulrasonic_distance < 60) {
            pins.servoWritePin(AnalogPin.P6, 180)
        }
    } else if (Rh < 45 || Rh > 60) {
        Environment.ledBrightness(AnalogPin.P4, false)
        Environment.ledBrightness(AnalogPin.P5, true)
        Environment.ledBrightness(AnalogPin.P2, true)
        pins.servoWritePin(AnalogPin.P6, 0)
    } else {
        Environment.ledBrightness(AnalogPin.P5, false)
        Environment.ledBrightness(AnalogPin.P4, false)
        Environment.ledBrightness(AnalogPin.P2, false)
    }
})
