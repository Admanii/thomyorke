import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';

const path = 'data.json';
const git = simpleGit();

const makeCommit = async (n) => {
    for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 55);
        const y = Math.floor(Math.random() * 7);
        const date = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();

        // Append instead of overwrite to ensure file changes
        const data = { date: date };
        let existing = [];
        try {
            existing = await jsonfile.readFile(path);
        } catch {
            existing = [];
        }

        if (!Array.isArray(existing)) existing = [existing];
        existing.push(data);

        await jsonfile.writeFile(path, existing);
        await git.add(path);
        await git.commit(date, { '--date': date });
    }

    await git.push();
};

makeCommit(100);
