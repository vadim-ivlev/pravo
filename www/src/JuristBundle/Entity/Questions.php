<?php

namespace JuristBundle\Entity;

/**
 * Questions
 */
class Questions
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $tags;

    /**
     * @var integer
     */
    private $rubrics;

    /**
     * @var integer
     */
    private $juristsId;

    /**
     * @var integer
     */
    private $AuthUsersId;

    /**
     * @var \DateTime
     */
    private $date;

    /**
     * @var integer
     */
    private $questionId;

    /**
     * @var string
     */
    private $answers;

    /**
     * @var integer
     */
    private $answersId;

    /**
     * @var integer
     */
    private $step;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $titleSeo;

    /**
     * @var string
     */
    private $description;

    /**
     * @var string
     */
    private $descriptionSeo;

    /**
     * @var string
     */
    private $keywordsSeo;

    /**
     * @var integer
     *
     */
    private $authorId;

    /**
     * @var integer
     */
    private $status;

    /**
     * @var \DateTime
     */
    private $deadline;

    /**
     * @var integer
     */
    private $deadlineId;

    /**
     * @var integer
     */
    private $deadlineInfo;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $editedAt;


    public function __construct()
    {
        $this->date = new \DateTime();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set tags
     *
     * @param integer tags
     *
     * @return Questions
     */
    public function setTags($tags)
    {
        $this->tags = $tags;

        return $this;
    }

    /**
     * Get tags
     *
     * @return integer
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set rubrics
     *
     * @param integer rubrics
     *
     * @return Questions
     */
    public function setRubrics($rubrics)
    {
        $this->rubrics = $rubrics;

        return $this;
    }

    /**
     * Get rubrics
     *
     * @return integer
     */
    public function getRubrics()
    {
        return $this->rubrics;
    }

    /**
     * Set juristsId
     *
     * @param integer $juristsId
     *
     * @return Questions
     */
    public function setJuristsId($juristsId)
    {
        $this->juristsId = $juristsId;

        return $this;
    }

    /**
     * Get juristsId
     *
     * @return integer
     */
    public function getJuristsId()
    {
        return $this->juristsId;
    }

    /**
     * Set AuthUsersId
     *
     * @param integer $AuthUsersId
     *
     * @return Questions
     */
    public function setAuthUsersId($AuthUsersId)
    {
        $this->AuthUsersId = $AuthUsersId;

        return $this;
    }

    /**
     * Get AuthUsersId
     *
     * @return integer
     */
    public function getAuthUsersId()
    {
        return $this->AuthUsersId;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Questions
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set questionId
     *
     * @param integer $questionId
     *
     * @return Questions
     */
    public function setQuestionId($questionId)
    {
        $this->questionId = $questionId;

        return $this;
    }

    /**
     * Get questionId
     *
     * @return integer
     */
    public function getQuestionId()
    {
        return $this->questionId;
    }


    /**
     * Set answers
     *
     * @param string $answers
     *
     * @return Answers
     */
    public function setAnswers($answers)
    {
        $this->answers = $answers;

        return $this;
    }

    /**
     * Get answers
     *
     * @return string
     */
    public function getAnswers()
    {
        return $this->answers;
    }

    /**
     * Set answersId
     *
     * @param integer $answersId
     *
     * @return AnswersId
     */
    public function setAnswersId($answersId)
    {
        $this->answersId = $answersId;

        return $this;
    }

    /**
     * Get answersId
     *
     * @return string
     */
    public function getAnswersId()
    {
        return $this->answersId;
    }

    /**
     * Set step
     *
     * @param integer $step
     *
     * @return Questions
     */
    public function setStep($step)
    {
        $this->step = $step;

        return $this;
    }

    /**
     * Get step
     *
     * @return integer
     */
    public function getStep()
    {
        return $this->step;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Questions
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set titleSeo
     *
     * @param string $titleSeo
     *
     * @return Questions
     */
    public function setTitleSeo($titleSeo)
    {
        $this->titleSeo = $titleSeo;

        return $this;
    }

    /**
     * Get titleSeo
     *
     * @return string
     */
    public function getTitleSeo()
    {
        return $this->titleSeo;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Questions
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set descriptionSeo
     *
     * @param string $descriptionSeo
     *
     * @return Questions
     */
    public function setDescriptionSeo($descriptionSeo)
    {
        $this->descriptionSeo = $descriptionSeo;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescriptionSeo()
    {
        return $this->descriptionSeo;
    }

    /**
     * Set keywordsSeo
     *
     * @param string $keywordsSeo
     *
     * @return Questions
     */
    public function setKeywordsSeo($keywordsSeo)
    {
        $this->keywordsSeo = $keywordsSeo;

        return $this;
    }

    /**
     * Get keywords
     *
     * @return string
     */
    public function getKeywordsSeo()
    {
        return $this->keywordsSeo;
    }

    /**
     * Set authorId
     *
     * @param integer $authorId
     *
     * @return Questions
     */
    public function setAuthorId($authorId)
    {
        $this->authorId = $authorId;

        return $this;
    }

    /**
     * Get authorId
     *
     * @return integer
     */
    public function getAuthorId()
    {
        return $this->authorId;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Questions
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return integer
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set deadline
     *
     * @param \DateTime $deadline
     *
     * @return Questions
     */
    public function setDeadline($deadline)
    {
        $this->deadline = $deadline;

        return $this;
    }

    /**
     * Get deadline
     *
     * @return \DateTime
     */
    public function getDeadline()
    {
        return $this->deadline;
    }

    /**
     * Set deadlineId
     *
     * @param integer $deadlineId
     *
     * @return Questions
     */
    public function setDeadlineId($deadlineId)
    {
        $this->deadlineId = $deadlineId;

        return $this;
    }

    /**
     * Get deadlineId
     *
     * @return integer
     */
    public function getDeadlineId()
    {
        return $this->deadlineId;
    }

    /**
     * Set deadlineInfo
     *
     * @param integer $deadlineInfo
     *
     * @return Questions
     */
    public function setDeadlineInfo($deadlineInfo)
    {
        $this->deadlineInfo = $deadlineInfo;

        return $this;
    }

    /**
     * Get deadlineInfo
     *
     * @return integer
     */
    public function getDeadlineInfo()
    {
        return $this->deadlineInfo;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Questions
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set editedAt
     *
     * @param \DateTime $editedAt
     *
     * @return Questions
     */
    public function setEditedAt($editedAt)
    {
        $this->editedAt = $editedAt;

        return $this;
    }

    /**
     * Get editedAt
     *
     * @return \DateTime
     */
    public function getEditedAt()
    {
        return $this->editedAt;
    }

    /**
     * Add tag
     *
     * @param \JuristBundle\Entity\Tags $tag
     *
     * @return Questions
     */
    public function addTag(\JuristBundle\Entity\Tags $tag)
    {
        $this->tags[] = $tag;

        return $this;
    }

    /**
     * Remove tag
     *
     * @param \JuristBundle\Entity\Tags $tag
     */
    public function removeTag(\JuristBundle\Entity\Tags $tag)
    {
        $this->tags->removeElement($tag);
    }

    /**
     * Add rubric
     *
     * @param \JuristBundle\Entity\Rubrics $rubric
     *
     * @return Questions
     */
    public function addRubric(\JuristBundle\Entity\Rubrics $rubric)
    {
        $this->rubrics[] = $rubric;

        return $this;
    }

    /**
     * Remove rubric
     *
     * @param \JuristBundle\Entity\Rubrics $rubric
     */
    public function removeRubric(\JuristBundle\Entity\Rubrics $rubric)
    {
        $this->rubrics->removeElement($rubric);
    }
}
