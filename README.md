# react-racing-bars

react-racing-bars is a data visualization tool that creates bar charts over timeframes. It can be used for generating animated infographs based on 3D data structure.

![Screenshot](./RacingBars-Demo.gif)

## Live Demo

Please checkout the live demo depoyed on: [https://racing-bars.netlify.app/](https://racing-bars.netlify.app/)

## npm package

[https://www.npmjs.com/package/react-racing-bars](https://www.npmjs.com/package/react-racing-bars)

## Implementation

install the component
`npm i react-racing-bars`

import it into your project
`import RacingBars from "react-racing-bars";`

use it like this:

`<RacingBars
        data={data}
        time="round"
        title="team"
        value="score"
        barHeight={30}
        topN={4}
        topNColor="lime"
        lastN={3}
        lastNColor="red"
      />`

Sample data can be found [here](https://github.com/Behnam1369/racing-bars/blob/main/src/data/standing.js) .

## Author

👤 **Behnam Aghaali**

- GitHub: [https://github.com/Behnam1369](https://github.com/Behnam1369)
- LinkedIn: [https://www.linkedin.com/in/behnam-aghaali](https://www.linkedin.com/in/behnam-aghaali)
- Twitter: [https://twitter.com/behnamagh1369](https://twitter.com/behnamagh1369)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!
