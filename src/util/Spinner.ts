import process from "process";
import rdl from "readline";

const stdout = process.stdout;

export class Spinner {
    private flag = false;

    Spinner() {
        this.flag = false;
    }

    spin() {
        stdout.write("\x1B[?25l");

        const spinners = ['-', '\\', '|', '/'];

        let index = 0;

        const interval = setInterval(() => {
            if(this.flag) {
                clearInterval(interval);
            }
            
            let line = spinners[index];

            if(line === undefined) {
                index = 0;
                line = spinners[index];
            }

            stdout.write(line);
            stdout.write(' transaction csv is loading...');
            rdl.clearScreenDown(stdout);
            rdl.cursorTo(stdout, 0, 0);

            index = index >= spinners.length ? 0 : index + 1;
        }, 10);
    }

    stop() {
        this.flag = true;
    }
}