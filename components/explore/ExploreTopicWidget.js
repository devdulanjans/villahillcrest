export default function ExploreTopicWidget({
  title = 'Things To Do In Sri Lanka',
  description = 'From ocean adventures to cultural landmarks, discover handpicked experiences around the south coast for every kind of traveler.'
}) {
  return (
    <div className="explore-topic-block">
      <h2 className="explore-topic">{title}</h2>
      <p className="explore-topic-copy">{description}</p>
    </div>
  )
}
