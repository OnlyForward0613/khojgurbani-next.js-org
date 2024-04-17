export function date_transform(value: string) {
    const dd: string = value.substring(8, 10);
    const MM: string = value.substring(5, 7);
    const yyyy: string = value.substring(0, 4);
    const months: { [key: string]: string } = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    };
    const date: string = `${months[MM]} ${dd}, ${yyyy}`;
    return date;
}