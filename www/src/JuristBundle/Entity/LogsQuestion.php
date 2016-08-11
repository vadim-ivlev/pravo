<?php

namespace JuristBundle\Entity;

/**
 * LogsQuestion
 */
class LogsQuestion
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $authUserIdModefided;

    /**
     * @var integer
     */
    private $parentQuestionId;

    /**
     * @var integer
     */
    private $parentAnswerId;

    /**
     * @var integer
     */
    private $parentAuthorId;

    /**
     * @var \DateTime
     */
    private $dateModefieded;

    /**
     * @var string
     */
    private $authorName;

    /**
     * @var string
     */
    private $originalAuthorName;

    /**
     * @var string
     */
    private $authorCity;

    /**
     * @var string
     */
    private $originalAuthorCity;

    /**
     * @var string
     */
    private $authorEmail;

    /**
     * @var string
     */
    private $originalAuthorEmail;

    /**
     * @var integer
     */
    private $step;

    /**
     * @var integer
     */
    private $originalStep;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $originalTitle;

    /**
     * @var string
     */
    private $description;

    /**
     * @var string
     */
    private $originalDescription;

    /**
     * @var integer
     */
    private $status;

    /**
     * @var integer
     */
    private $originalStatus;

    /**
     * @var \DateTime
     */
    private $deadline;

    /**
     * @var \DateTime
     */
    private $originalDeadline;

    /**
     * @var string
     */
    private $rubricsId;

    /**
     * @var string
     */
    private $originalRubricsId;

    /**
     * @var string
     */
    private $tagsId;

    /**
     * @var string
     */
    private $originalTagsId;

    /**
     * @var string
     */
    private $answerSteps;

    /**
     * @var string
     */
    private $originalAnswerSteps;

    /**
     * @var string
     */
    private $answers;

    /**
     * @var string
     */
    private $originalAnswers;

    /**
     * @var \DateTime
     */
    private $originalDateAnswer;


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
     * Set authUserIdModefided
     *
     * @param integer $authUserIdModefided
     *
     * @return LogsQuestion
     */
    public function setAuthUserIdModefided($authUserIdModefided)
    {
        $this->authUserIdModefided = $authUserIdModefided;

        return $this;
    }

    /**
     * Get authUserIdModefided
     *
     * @return integer
     */
    public function getAuthUserIdModefided()
    {
        return $this->authUserIdModefided;
    }

    /**
     * Set parentQuestionId
     *
     * @param integer $parentQuestionId
     *
     * @return LogsQuestion
     */
    public function setParentQuestionId($parentQuestionId)
    {
        $this->parentQuestionId = $parentQuestionId;

        return $this;
    }

    /**
     * Get parentQuestionId
     *
     * @return integer
     */
    public function getParentQuestionId()
    {
        return $this->parentQuestionId;
    }

    /**
     * Set parentAuthorId
     *
     * @param integer $parentAuthorId
     *
     * @return LogsQuestion
     */
    public function setParentAuthorId($parentAuthorId)
    {
        $this->parentAuthorId = $parentAuthorId;

        return $this;
    }

    /**
     * Get parentAuthorId
     *
     * @return integer
     */
    public function getParentAuthorId()
    {
        return $this->parentAuthorId;
    }

    /**
     * Set parentAnswerId
     *
     * @param integer $parentAnswerId
     *
     * @return LogsQuestion
     */
    public function setParentAnswerId($parentAnswerId)
    {
        $this->parentAuthorId = $parentAnswerId;

        return $this;
    }

    /**
     * Get parentAnswerId
     *
     * @return integer
     */
    public function getParentAnswerId()
    {
        return $this->parentAnswerId;
    }

    /**
     * Set dateModefieded
     *
     * @param \DateTime $dateModefieded
     *
     * @return LogsQuestion
     */
    public function setDateModefieded($dateModefieded)
    {
        $this->dateModefieded = $dateModefieded;

        return $this;
    }

    /**
     * Get dateModefieded
     *
     * @return \DateTime
     */
    public function getDateModefieded()
    {
        return $this->dateModefieded;
    }

    /**
     * Set authorName
     *
     * @param string $authorName
     *
     * @return LogsQuestion
     */
    public function setAuthorName($authorName)
    {
        $this->authorName = $authorName;

        return $this;
    }

    /**
     * Get authorName
     *
     * @return string
     */
    public function getAuthorName()
    {
        return $this->authorName;
    }

    /**
     * Set originalAuthorName
     *
     * @param string $originalAuthorName
     *
     * @return LogsQuestion
     */
    public function setOriginalAuthorName($originalAuthorName)
    {
        $this->originalAuthorName = $originalAuthorName;

        return $this;
    }

    /**
     * Get originalAuthorName
     *
     * @return string
     */
    public function getOriginalAuthorName()
    {
        return $this->originalAuthorName;
    }

    /**
     * Set authorName
     *
     * @param string $authorEmail
     *
     * @return LogsQuestion
     */
    public function setAuthorEmail($authorEmail)
    {
        $this->authorEmail = $authorEmail;

        return $this;
    }

    /**
     * Get authorEmail
     *
     * @return string
     */
    public function getAuthorEmail()
    {
        return $this->authorEmail;
    }

    /**
     * Set originalAuthorName
     *
     * @param string $originalAuthorEmail
     *
     * @return LogsQuestion
     */
    public function setOriginalAuthorEmail($originalAuthorEmail)
    {
        $this->originalAuthorEmail = $originalAuthorEmail;

        return $this;
    }

    /**
     * Get originalAuthorEmail
     *
     * @return string
     */
    public function getOriginalAuthorEmail()
    {
        return $this->originalAuthorEmail;
    }

    /**
     * Set authorName
     *
     * @param string $authorCity
     *
     * @return LogsQuestion
     */
    public function setAuthorCity($authorCity)
    {
        $this->authorCity = $authorCity;

        return $this;
    }

    /**
     * Get authorCity
     *
     * @return string
     */
    public function getAuthorCity()
    {
        return $this->authorCity;
    }

    /**
     * Set originalAuthorName
     *
     * @param string $originalAuthorCity
     *
     * @return LogsQuestion
     */
    public function setOriginalAuthorCity($originalAuthorCity)
    {
        $this->originalAuthorCity = $originalAuthorCity;

        return $this;
    }

    /**
     * Get originalAuthorCity
     *
     * @return string
     */
    public function getOriginalAuthorCity()
    {
        return $this->originalAuthorCity;
    }

    /**
     * Set step
     *
     * @param integer $step
     *
     * @return LogsQuestion
     */
    public function setStep($step)
    {
        $this->step = $step;

        return $this;
    }

    /**
     * Get originalStep
     *
     * @return integer
     */
    public function getOriginalStep()
    {
        return $this->originalStep;
    }

    /**
     * Set originalStep
     *
     * @param integer $originalStep
     *
     * @return LogsQuestion
     */
    public function setOriginalStep($originalStep)
    {
        $this->originalStep = $originalStep;

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
     * @return LogsQuestion
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
     * Set originalTitle
     *
     * @param string $originalTitle
     *
     * @return LogsQuestion
     */
    public function setOriginalTitle($originalTitle)
    {
        $this->originalTitle = $originalTitle;

        return $this;
    }

    /**
     * Get originalTitle
     *
     * @return string
     */
    public function getOriginalTitle()
    {
        return $this->originalTitle;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return LogsQuestion
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
     * Set originalDescription
     *
     * @param string $originalDescription
     *
     * @return LogsQuestion
     */
    public function setOriginalDescription($originalDescription)
    {
        $this->originalDescription = $originalDescription;

        return $this;
    }

    /**
     * Get originalDescription
     *
     * @return string
     */
    public function getOriginalDescription()
    {
        return $this->originalDescription;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return LogsQuestion
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
     * Set originalStatus
     *
     * @param integer $originalStatus
     *
     * @return LogsQuestion
     */
    public function setOriginalStatus($originalStatus)
    {
        $this->originalStatus = $originalStatus;

        return $this;
    }

    /**
     * Get originalStatus
     *
     * @return integer
     */
    public function getOriginalStatus()
    {
        return $this->originalStatus;
    }

    /**
     * Set deadline
     *
     * @param \DateTime $deadline
     *
     * @return LogsQuestion
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
     * Set originalDeadline
     *
     * @param \DateTime $originalDeadline
     *
     * @return LogsQuestion
     */
    public function setOriginalDeadline($originalDeadline)
    {
        $this->originalDeadline = $originalDeadline;

        return $this;
    }

    /**
     * Get originalDeadline
     *
     * @return \DateTime
     */
    public function getOriginalDeadline()
    {
        return $this->originalDeadline;
    }

    /**
     * Set rubricsId
     *
     * @param string $rubricsId
     *
     * @return LogsQuestion
     */
    public function setRubricsId($rubricsId)
    {
        $this->rubricsId = $rubricsId;

        return $this;
    }

    /**
     * Get rubricsId
     *
     * @return string
     */
    public function getRubricsId()
    {
        return $this->rubricsId;
    }

    /**
     * Set originalRubricsId
     *
     * @param string $originalRubricsId
     *
     * @return LogsQuestion
     */
    public function setOriginalRubricsId($originalRubricsId)
    {
        $this->originalRubricsId = $originalRubricsId;

        return $this;
    }

    /**
     * Get originalRubricsId
     *
     * @return string
     */
    public function getOriginalRubricsId()
    {
        return $this->originalRubricsId;
    }

    /**
     * Set tagsId
     *
     * @param string $tagsId
     *
     * @return LogsQuestion
     */
    public function setTagsId($tagsId)
    {
        $this->tagsId = $tagsId;

        return $this;
    }

    /**
     * Get tagsId
     *
     * @return string
     */
    public function getTagsId()
    {
        return $this->tagsId;
    }

    /**
     * Set originalTagsId
     *
     * @param string $originalTagsId
     *
     * @return LogsQuestion
     */
    public function setOriginalTagsId($originalTagsId)
    {
        $this->originalTagsId = $originalTagsId;

        return $this;
    }

    /**
     * Get originalTagsId
     *
     * @return string
     */
    public function getOriginalTagsId()
    {
        return $this->originalTagsId;
    }

    /**
     * Set answerSteps
     *
     * @param string $answerSteps
     *
     * @return LogsQuestion
     */
    public function setAnswerSteps($answerSteps)
    {
        $this->answerSteps = $answerSteps;

        return $this;
    }

    /**
     * Get answerSteps
     *
     * @return string
     */
    public function getAnswerSteps()
    {
        return $this->answerSteps;
    }

    /**
     * Set originalAnswerSteps
     *
     * @param string $originalAnswerSteps
     *
     * @return LogsQuestion
     */
    public function setOriginalAnswerSteps($originalAnswerSteps)
    {
        $this->originalAnswerSteps = $originalAnswerSteps;

        return $this;
    }

    /**
     * Get originalAnswerSteps
     *
     * @return string
     */
    public function getOriginalAnswerSteps()
    {
        return $this->originalAnswerSteps;
    }

    /**
     * Set answerSteps
     *
     * @param string $answerSteps
     *
     * @return LogsQuestion
     */
    public function setAnswers($answerSteps)
    {
        $this->answerSteps = $answerSteps;

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
     * Set originalAnswers
     *
     * @param string $originalAnswers
     *
     * @return LogsQuestion
     */
    public function setOriginalAnswers($originalAnswers)
    {
        $this->originalAnswers = $originalAnswers;

        return $this;
    }

    /**
     * Get originalAnswers
     *
     * @return string
     */
    public function getOriginalAnswers()
    {
        return $this->originalAnswers;
    }

    /**
     * Set originalDateAnswer
     *
     * @param \DateTime $originalDateAnswer
     *
     * @return LogsQuestion
     */
    public function setOriginalDateAnswer($originalDateAnswer)
    {
        $this->originalDateAnswer = $originalDateAnswer;

        return $this;
    }

    /**
     * Get originalDateAnswer
     *
     * @return \DateTime
     */
    public function getOriginalDateAnswer()
    {
        return $this->originalDateAnswer;
    }
}

