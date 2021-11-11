class Lorem {
    
    static #paragraphs = [
        // [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Pellentesque varius nisi purus, in dignissim justo egestas et.",
            "Suspendisse suscipit, metus vitae facilisis cursus, diam est malesuada tellus, eu viverra risus sapien nec neque.",
            "Etiam rhoncus dolor eu libero imperdiet iaculis ac sed neque.",
            "Mauris vitae laoreet purus.",
            "Ut fermentum rhoncus ligula, a commodo augue volutpat eu.",
            "Nam et ligula bibendum, egestas velit vel, molestie sem.",
            "Aliquam ut purus tincidunt, tempus eros eu, placerat quam.",
            "Duis lobortis neque id dignissim molestie.",
            "Suspendisse congue ex sit amet condimentum suscipit.",
            "Mauris eleifend, ipsum in feugiat aliquet, tellus leo dapibus ipsum, tempus euismod tellus erat a dolor.",
            "Sed vel enim pretium, vehicula lorem nec, rhoncus lectus.",
        // ],
        // [
            "Suspendisse tempus sapien non semper dictum.",
            "Duis dignissim gravida arcu, et consequat libero elementum ut.",
            "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
            "Suspendisse potenti.",
            "Proin faucibus libero nec quam imperdiet dictum.",
            "Vivamus ultrices tristique orci, sed efficitur lectus dignissim id.",
            "Nulla ac pulvinar justo, in pulvinar leo.",
            "Sed molestie, leo gravida ultricies suscipit, libero libero cursus purus, eget auctor felis dolor et orci.",
            "Nullam eget pharetra tellus.",
            "Aenean rhoncus massa quis est iaculis, in pulvinar magna eleifend.",
        // ]
    ]
    
    static generate(sentences = 1, paragraphs = 1) {
        let result = [];
        new Array(paragraphs).fill(null).forEach(() => {
            let paragraph = [];
            new Array(sentences).fill(null).forEach(() => {
                let randomIndex = Math.random(Lorem.#paragraphs.length-1, true);
                paragraph.push(Lorem.#paragraphs[randomIndex]);
            });
            result.push(paragraph);
        });
        result = result.map(p => p.join(" "));
        result = result.join("\r\n\r\n");
        return result;
    }
    
}