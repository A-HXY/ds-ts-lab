import { Friend, Colleague, EmailContact } from './myTypes';
import { friends, colleagues } from "./01-basics";

function older(f: Friend): string {
    return `${f.name} is now ${f.age + 1}`;
}

console.log(older(friends[0]))

function allOlder(fs: Friend[]): string[] {
    return fs.map(f => `${f.name} is now ${f.age + 1}`);
}

console.log(allOlder(friends));

function highestExtension(cs: Colleague[]): Colleague {
    return [...cs].sort((c1, c2) => c1.contact.extension - c2.contact.extension)[cs.length - 1];
}

console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], name: string, department: string, email: string): void {
    const maxExtension = cs.reduce((max, c) => Math.max(max, c.contact.extension), 0);
    cs.push({ name, department, contact: { email, extension: maxExtension + 1 } });
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter(c => c.name === "Sheild O Connell"));

function sortColleagues(
    colleagues: Colleague[],
    sorter: (c1: Colleague, c2: Colleague) => number,
    max?: number 
): EmailContact[] {
    let end = colleagues.length;
    if (max !== undefined) { 
        end = max < 2 ? 1 : max;
    }
    const sorted = [...colleagues].sort(sorter); 
    const fullResult = sorted.map(ce => ({ name: ce.name, email: ce.contact.email }));
    return fullResult.slice(0, end);
}

console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension), 3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length), 1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); 

function findFriends(fs: Friend[], predicate: (f: Friend) => boolean): string[] {
    return fs.filter(predicate).map(f => f.name);
}

console.log(findFriends(friends, f => f.name.startsWith('Pa')));
console.log(findFriends(friends, f => f.age < 35));

function addInterest(f: Friend, interest: string): string[] {
    if (!f.interests) {
        f.interests = []; 
    }
    f.interests.push(interest);
    return f.interests;
}

console.log(addInterest(friends[0], "Politics")); 
console.log(addInterest(friends[1], "Reading")); 