let Rh = 0
let ulrasonic_distance = 0
let Temp = 0
OLED.init(128, 64)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    Temp = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    basic.pause(5000)
    ulrasonic_distance = Environment.sonarbit_distance(Environment.Distance_Unit.Distance_Unit_cm, DigitalPin.P3)
    Rh = Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, DigitalPin.P1)
    basic.pause(5000)
    OLED.clear()
    OLED.writeStringNewLine("Temp" + "Temp")
    OLED.writeStringNewLine("RH" + "RH")
    if (Temp < 14 || Temp > 24) {
        Environment.ledBrightness(AnalogPin.P2, true)
        if (true) {
        	
        }
    } else if (Rh < 45 || Rh > 60) {
        Environment.ledBrightness(AnalogPin.P2, true)
    } else {
        Environment.ledBrightness(AnalogPin.P2, false)
    }
})
