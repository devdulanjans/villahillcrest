import { createSurfBreak, listSurfBreaks } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

const SEED_DATA = [
  {
    name: 'Weligama',
    tagline: 'The Perfect Place To Start',
    sortOrder: 0,
    breaks: [
      { name: 'Weligama Beach',   level: 'Beginner',     note: '8 min from Villa Hillcrest' },
      { name: "Fisherman's Reef", level: 'Intermediate', note: '15 min from Villa Hillcrest' },
      { name: 'Jungle Beach',     level: 'Intermediate', note: '20 min from Villa Hillcrest' },
    ],
    photos: [
      { src: 'https://lakpura.com/cdn/shop/files/Weligama_3d34bebf-ece2-4fd1-a8e0-016502f16872.jpg?v=1698924969&width=3840', alt: 'Weligama Beach - beginner surf break',        label: 'Weligama Beach',   level: 'Beginner' },
      { src: 'https://lakpura.com/cdn/shop/files/LK94E4E394-00-E.jpg?v=1742843918&width=3840',                                alt: "Fisherman's Reef - intermediate surf break", label: "Fisherman's Reef", level: 'Intermediate' },
      { src: 'https://www.andbeyond.com/wp-content/uploads/sites/5/uga-jungle-beach-trincomalee-aerial-lodge-and-sea-view.jpg', alt: 'Jungle Beach - intermediate surf break',    label: 'Jungle Beach',    level: 'Intermediate' },
    ],
  },
  {
    name: 'Midigama',
    tagline: "Sri Lanka's Surf Playground",
    sortOrder: 1,
    breaks: [
      { name: 'Plantation', level: 'Intermediate', note: '' },
      { name: 'Coconuts',   level: 'Intermediate', note: '' },
      { name: "Ram's",      level: 'Advanced',     note: '' },
      { name: 'Lazy Left',  level: 'Advanced',     note: '' },
      { name: 'Lazy Right', level: 'Intermediate', note: '' },
    ],
    photos: [
      { src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80&auto=format&fit=crop', alt: 'Plantation surf break Midigama',        label: 'Plantation', level: 'Intermediate' },
      { src: 'https://images.unsplash.com/photo-1471579917827-f5e2de15d52c?w=400&q=80&auto=format&fit=crop', alt: 'Coconuts surf break Midigama',          label: 'Coconuts',   level: 'Intermediate' },
      { src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80&auto=format&fit=crop', alt: "Ram's advanced reef break Midigama",    label: "Ram's",      level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&q=80&auto=format&fit=crop', alt: 'Lazy Left advanced surf break',         label: 'Lazy Left',  level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1504561570799-bb27f3ba9a88?w=400&q=80&auto=format&fit=crop', alt: 'Lazy Right surf break Midigama',        label: 'Lazy Right', level: 'Intermediate' },
    ],
  },
  {
    name: 'Ahangama',
    tagline: 'Where Progress Meets Performance',
    sortOrder: 2,
    breaks: [
      { name: 'Kabalana Beach', level: 'Beginner',     note: '' },
      { name: 'Marshmallows',   level: 'Intermediate', note: '' },
      { name: 'The Rock',       level: 'Advanced',     note: '' },
      { name: 'Sticks',         level: 'Advanced',     note: '' },
      { name: "Devil's Island", level: 'Advanced',     note: '' },
    ],
    photos: [
      { src: 'https://images.unsplash.com/photo-1445809508206-1bfbf4e31836?w=400&q=80&auto=format&fit=crop', alt: 'Kabalana Beach beginner break Ahangama',    label: 'Kabalana Beach', level: 'Beginner' },
      { src: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&q=80&auto=format&fit=crop', alt: 'Marshmallows intermediate break Ahangama',  label: 'Marshmallows',   level: 'Intermediate' },
      { src: 'https://images.unsplash.com/photo-1444044205806-38f3ed106c10?w=400&q=80&auto=format&fit=crop', alt: 'The Rock advanced reef break Ahangama',     label: 'The Rock',       level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1543470373-e055b73a8f29?w=400&q=80&auto=format&fit=crop', alt: 'Sticks advanced surf break Ahangama',        label: 'Sticks',         level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1477859904017-ad87dfdf8b91?w=400&q=80&auto=format&fit=crop', alt: "Devil's Island advanced break Ahangama",   label: "Devil's Island", level: 'Advanced' },
    ],
  },
  {
    name: 'Mirissa',
    tagline: 'Scenic Waves & Tropical Coastlines',
    sortOrder: 3,
    breaks: [
      { name: 'Mirissa Beach Break', level: 'Beginner',     note: '' },
      { name: 'Mirissa Point',       level: 'Intermediate', note: '' },
    ],
    photos: [
      { src: 'https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?w=400&q=80&auto=format&fit=crop', alt: 'Mirissa Beach Break beginner surf',        label: 'Mirissa Beach Break', level: 'Beginner' },
      { src: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=400&q=80&auto=format&fit=crop', alt: 'Mirissa Point intermediate surf break',  label: 'Mirissa Point',       level: 'Intermediate' },
    ],
  },
  {
    name: 'Madiha',
    tagline: 'For Experienced Wave Hunters',
    sortOrder: 4,
    breaks: [
      { name: 'Madiha Right',        level: 'Advanced', note: '' },
      { name: 'Madiha Left',         level: 'Advanced', note: '' },
      { name: 'SE Town',             level: 'Advanced', note: '' },
      { name: 'Lakshawatttha Beach', level: 'Beginner', note: '' },
    ],
    photos: [
      { src: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=400&q=80&auto=format&fit=crop&crop=entropy', alt: 'Madiha Right advanced surf break',        label: 'Madiha Right',        level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80&auto=format&fit=crop&crop=entropy', alt: 'Madiha Left advanced surf break',         label: 'Madiha Left',         level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1504561570799-bb27f3ba9a88?w=400&q=80&auto=format&fit=crop&crop=entropy', alt: 'SE Town advanced surf break',             label: 'SE Town',             level: 'Advanced' },
      { src: 'https://images.unsplash.com/photo-1531722569936-825d4eabb6e9?w=400&q=80&auto=format&fit=crop&crop=entropy', alt: 'Lakshawatttha Beach beginner break',      label: 'Lakshawatttha Beach', level: 'Beginner' },
    ],
  },
];

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const existing = await listSurfBreaks();
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Seed skipped — ${existing.length} location(s) already exist. Delete them first if you want to re-seed.`,
      });
    }

    const created = [];
    for (const entry of SEED_DATA) {
      const item = await createSurfBreak({
        name: entry.name,
        tagline: entry.tagline,
        breaks: entry.breaks,
        photos: entry.photos,
        sortOrder: entry.sortOrder,
        enabled: true,
      });
      created.push(item);
    }

    return res.status(201).json({ success: true, count: created.length });
  } catch (err) {
    console.error('Surf breaks seed failed:', err);
    return res.status(500).json({ success: false, message: 'Seed failed' });
  }
}
