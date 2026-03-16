/**
 * Social Media Peak Times — Platform Engagement Data
 * 
 * Data compiled from research by:
 * - Hootsuite (2024 Best Times to Post Report)
 * - Sprout Social (2024 Social Media Benchmarks)
 * - Buffer (State of Social Media Report)
 * - Later (Social Media Marketing Data)
 * - HubSpot (Marketing Trends Report)
 * 
 * Values represent relative audience activity (0-100 scale)
 * Each row = 1 hour (0-23), each column = day [Sun,Mon,Tue,Wed,Thu,Fri,Sat]
 */

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS = [];
for (let i = 0; i < 24; i++) {
  const h = i % 12 === 0 ? 12 : i % 12;
  const ap = i < 12 ? 'AM' : 'PM';
  HOURS.push(`${h}:00 ${ap}`);
}

const platformData = {
  youtube: {
    name: 'YouTube',
    accent: '#ff0000',
    accentLight: 'rgba(255,0,0,',
    glowCell: 'rgba(255,0,0,0.4)',
    bestDay: 'Friday',
    bestTime: '2:00 – 4:00 PM',
    bestUpload: '12:00 PM',
    avgEngagement: 'High',
    tips: [
      {
        icon: '🎬',
        title: 'Upload Before Peak',
        text: 'Post 2-3 hours before peak viewing times. The algorithm needs time to index, process, and begin recommending your video to viewers.'
      },
      {
        icon: '📅',
        title: 'Consistency Matters',
        text: 'Stick to a regular upload schedule. YouTube\'s algorithm rewards channels that post on predictable, consistent schedules.'
      },
      {
        icon: '🌅',
        title: 'Weekday Afternoons Win',
        text: 'Thursday and Friday afternoons see the highest activity levels. Ideal for premieres, community posts, and long-form content.'
      },
      {
        icon: '📱',
        title: 'Shorts Timing',
        text: 'YouTube Shorts perform well in morning hours (7-9 AM) when users are scrolling during their commute or morning routine.'
      }
    ],
    data: [
      [40, 15, 15, 15, 15, 18, 42],
      [35, 10, 10, 12, 12, 15, 38],
      [25, 8, 8, 8, 8, 10, 28],
      [18, 5, 5, 5, 5, 8, 20],
      [12, 5, 5, 5, 5, 5, 15],
      [10, 8, 8, 8, 8, 8, 12],
      [15, 15, 15, 15, 15, 15, 18],
      [25, 30, 30, 30, 30, 28, 30],
      [40, 42, 42, 42, 40, 38, 45],
      [55, 55, 58, 55, 55, 52, 58],
      [65, 65, 68, 65, 68, 65, 68],
      [75, 72, 75, 72, 75, 78, 75],
      [85, 80, 82, 80, 82, 88, 80],
      [88, 82, 85, 85, 85, 92, 82],
      [90, 85, 88, 88, 90, 95, 85],
      [88, 82, 85, 88, 88, 92, 82],
      [82, 78, 80, 82, 85, 88, 78],
      [78, 72, 75, 75, 78, 82, 75],
      [75, 68, 70, 72, 72, 78, 72],
      [72, 65, 68, 70, 68, 72, 70],
      [68, 60, 62, 65, 65, 68, 65],
      [62, 55, 58, 60, 58, 62, 60],
      [55, 45, 48, 50, 50, 55, 55],
      [48, 35, 38, 40, 40, 45, 48]
    ],
    dailyAvg: [55, 48, 50, 52, 52, 58, 54]
  },

  instagram: {
    name: 'Instagram',
    accent: '#e1306c',
    accentLight: 'rgba(225,48,108,',
    glowCell: 'rgba(225,48,108,0.4)',
    bestDay: 'Wednesday',
    bestTime: '11:00 AM – 1:00 PM',
    bestUpload: '11:00 AM',
    avgEngagement: 'High',
    tips: [
      {
        icon: '📸',
        title: 'Reels First Thing',
        text: 'Post Reels between 9-11 AM on weekdays. Instagram heavily prioritizes Reels in the morning explore feed and recommendations.'
      },
      {
        icon: '📊',
        title: 'Stories All Day',
        text: 'Stories have a 24-hour window. Post your first story by 8 AM to capture morning scrollers and maintain visibility all day.'
      },
      {
        icon: '🔥',
        title: 'Midweek is Peak',
        text: 'Tuesday through Thursday consistently outperform other days for feed posts, carousels, and collaborative content.'
      },
      {
        icon: '🌙',
        title: 'Evening Engagement',
        text: 'Second engagement peak at 7-9 PM. Great time for interactive stories, polls, Q&A content, and live sessions.'
      }
    ],
    data: [
      [30, 12, 12, 12, 12, 15, 32],
      [22, 8, 8, 8, 8, 10, 25],
      [15, 5, 5, 5, 5, 5, 18],
      [10, 3, 3, 3, 3, 3, 12],
      [8, 3, 3, 3, 3, 3, 8],
      [10, 8, 10, 10, 8, 8, 10],
      [18, 20, 22, 22, 20, 18, 15],
      [35, 45, 48, 48, 45, 42, 30],
      [50, 60, 65, 62, 60, 58, 45],
      [62, 72, 75, 72, 70, 68, 55],
      [70, 80, 85, 82, 80, 75, 65],
      [78, 88, 92, 95, 90, 82, 72],
      [80, 85, 90, 92, 88, 80, 75],
      [72, 78, 82, 85, 82, 75, 68],
      [58, 62, 65, 68, 65, 62, 55],
      [48, 52, 55, 58, 55, 52, 48],
      [45, 48, 50, 52, 50, 48, 45],
      [50, 55, 58, 58, 55, 52, 48],
      [60, 65, 68, 68, 65, 62, 58],
      [72, 78, 82, 80, 78, 72, 68],
      [75, 80, 85, 82, 80, 75, 72],
      [65, 68, 72, 70, 68, 65, 62],
      [50, 52, 55, 52, 50, 50, 48],
      [38, 35, 38, 38, 35, 38, 40]
    ],
    dailyAvg: [47, 50, 55, 56, 53, 48, 44]
  },

  tiktok: {
    name: 'TikTok',
    accent: '#25f4ee',
    accentLight: 'rgba(37,244,238,',
    glowCell: 'rgba(37,244,238,0.4)',
    bestDay: 'Tue & Thu',
    bestTime: '7:00 – 9:00 PM',
    bestUpload: '7:00 PM',
    avgEngagement: 'Very High',
    tips: [
      {
        icon: '🎵',
        title: 'Evening Dominance',
        text: 'TikTok usage spikes dramatically between 7-11 PM across all days. This is prime time for maximum reach on the For You Page.'
      },
      {
        icon: '☀️',
        title: 'Morning Window',
        text: 'The 7-9 AM slot catches early scrollers during commutes. Post trending audio and quick-hit content here for fast momentum.'
      },
      {
        icon: '🔄',
        title: 'Post Frequently',
        text: 'TikTok\'s algorithm rewards posting volume. Aim for 1-3 posts daily, spread across peak morning, lunch, and evening windows.'
      },
      {
        icon: '🌍',
        title: 'Global Audience',
        text: 'TikTok has a highly global reach compared to other platforms. Consider posting at varied times to capture international viewers.'
      }
    ],
    data: [
      [45, 25, 25, 25, 28, 30, 48],
      [38, 18, 18, 18, 20, 22, 40],
      [25, 10, 10, 10, 12, 15, 28],
      [15, 5, 5, 5, 5, 8, 18],
      [10, 5, 5, 5, 5, 5, 12],
      [12, 8, 8, 8, 8, 8, 12],
      [20, 18, 20, 18, 20, 18, 18],
      [42, 55, 60, 55, 58, 52, 38],
      [50, 62, 68, 62, 65, 58, 45],
      [48, 55, 60, 55, 58, 52, 42],
      [42, 48, 52, 50, 50, 48, 40],
      [45, 50, 55, 52, 52, 50, 42],
      [55, 62, 65, 65, 68, 60, 52],
      [52, 58, 62, 60, 62, 58, 50],
      [48, 52, 55, 55, 58, 52, 45],
      [45, 48, 50, 50, 52, 48, 42],
      [48, 52, 55, 52, 55, 52, 45],
      [55, 60, 65, 62, 65, 60, 52],
      [65, 72, 78, 75, 78, 72, 62],
      [78, 85, 92, 88, 95, 82, 75],
      [82, 88, 95, 92, 98, 85, 80],
      [80, 85, 90, 88, 92, 82, 78],
      [72, 75, 80, 78, 80, 75, 72],
      [58, 55, 60, 58, 60, 55, 58]
    ],
    dailyAvg: [47, 48, 53, 50, 54, 48, 45]
  },

  facebook: {
    name: 'Facebook',
    accent: '#1877f2',
    accentLight: 'rgba(24,119,242,',
    glowCell: 'rgba(24,119,242,0.4)',
    bestDay: 'Wednesday',
    bestTime: '10:00 AM – 12:00 PM',
    bestUpload: '10:00 AM',
    avgEngagement: 'Moderate',
    tips: [
      {
        icon: '💼',
        title: 'Workday Winners',
        text: 'Facebook peaks during standard work hours, especially mid-morning. Users browse during coffee breaks and lunch hours.'
      },
      {
        icon: '📉',
        title: 'Weekend Drop-Off',
        text: 'Engagement drops noticeably on weekends compared to weekdays. Focus your highest-value content Tuesday through Thursday.'
      },
      {
        icon: '🎥',
        title: 'Video Gets Priority',
        text: 'Facebook\'s algorithm prioritizes video content, especially Reels. Post video during the 10 AM – 12 PM peak window.'
      },
      {
        icon: '👥',
        title: 'Groups Timing',
        text: 'Community and group posts perform best early morning (7-8 AM) when members check notifications and catch up.'
      }
    ],
    data: [
      [22, 10, 10, 10, 10, 12, 24],
      [15, 5, 5, 5, 5, 8, 18],
      [10, 3, 3, 3, 3, 3, 12],
      [5, 2, 2, 2, 2, 2, 8],
      [5, 2, 2, 2, 2, 2, 5],
      [8, 8, 8, 8, 8, 8, 8],
      [15, 18, 18, 18, 18, 15, 12],
      [28, 38, 40, 40, 38, 35, 22],
      [42, 58, 60, 62, 58, 55, 35],
      [52, 68, 72, 75, 70, 65, 42],
      [60, 78, 82, 88, 80, 75, 50],
      [65, 85, 88, 95, 88, 82, 55],
      [62, 82, 85, 90, 85, 80, 52],
      [55, 72, 75, 80, 75, 72, 48],
      [48, 60, 62, 65, 62, 60, 42],
      [42, 52, 55, 58, 55, 52, 38],
      [38, 45, 48, 50, 48, 45, 35],
      [35, 42, 45, 48, 45, 42, 32],
      [38, 45, 48, 50, 48, 45, 35],
      [40, 48, 50, 52, 50, 48, 38],
      [38, 42, 45, 48, 45, 42, 36],
      [32, 35, 38, 40, 38, 35, 30],
      [25, 25, 28, 30, 28, 25, 25],
      [20, 18, 20, 22, 20, 18, 22]
    ],
    dailyAvg: [33, 40, 43, 47, 43, 40, 30]
  }
};
