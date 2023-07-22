function mode() {
    let input     = Array.from(arguments);
    let frequency = new Frequency(input);
    return frequency.getItemsByFrequency(frequency.getMaxFrequency());
}