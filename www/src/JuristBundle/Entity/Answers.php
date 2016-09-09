<?php

namespace JuristBundle\Entity;

/**
 * Answers
 */
class Answers
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var integer
     */
    private $questionId;

    /**
     * @var integer
     */
    private $juristsId;

    /**
     * @var integer
     */
    private $authUsersId;

    /**
     * @var string
     */
    private $answers;

    /**
     * @var string
     */
    private $answersSteps;

    /**
     * @var \DateTime
     */
    private $date;

    /**
     * @var integer
     */
    private $rating;

    /**
     * @var integer
     */
    private $question;

    /**
     * @var \DateTime
     */
    private $createdAt;

    /**
     * @var \DateTime
     */
    private $editedAt;

    /**
     * @var string
     *  тип ответа (cart - ответ дан по пункатм)
     */
    private $typeCards;

    /**
     * @var boolean
     * закрпленные вопросы на главной РГ, которых не больше N штук (на 22.08.2016 N = 6)
     */
    private $secureEntryCheck;

    /**
     * @var boolean
     * вопросы на главной РГ, которые сортируются по $entryFeedDate
     */
    private $entryFeedCheck;

    /**
     * @var \DateTime
     * дата для $secureEntryCheck
     */
    private $entryFeedDate;

    /**
     * @var integer
     * реальный пользователь для возврата ответа в админке, если ответил модер компании за юриста
     */
    private $actualUserCharge;

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
     * Set juristsId
     *
     * @param integer $juristsId
     *
     * @return Answers
     */
    public function setJuristsId($juristsId)
    {
        $this->juristsId = $juristsId;

        return $this;
    }

    /**
     * Get authUsersId
     *
     * @return integer
     */
    public function getAuthUsersId()
    {
        return $this->authUsersId;
    }

    /**
     * Set authUsersId
     *
     * @param integer $authUsersId
     *
     * @return Answers
     */
    public function setAuthUsersId($authUsersId)
    {
        $this->authUsersId = $authUsersId;

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
     * Set questionId
     *
     * @param integer $questionId
     *
     * @return Answers
     */

    public function setQuestionsId($questionId)
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
     * Set answersSteps
     *
     * @param string $answersSteps
     *
     * @return Answers
     */
    public function setAnswersSteps($answersSteps)
    {
        $this->answersSteps = $answersSteps;

        return $this;
    }

    /**
     * Get $answersSteps
     *
     * @return string
     */
    public function getAnswersSteps()
    {
        return $this->answersSteps;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Answers
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
     * Set rating
     *
     * @param integer $rating
     *
     * @return Answers
     */
    public function setRating($rating)
    {
        $this->rating = $rating;

        return $this;
    }

    /**
     * Get rating
     *
     * @return integer
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * Set question
     *
     * @param integer $question
     *
     * @return Answers
     */
    public function setQuestion($question)
    {
        $this->question = $question;

        return $this;
    }

    /**
     * Get question
     *
     * @return integer
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Answers
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
     * @return Answers
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
     * Set typeCards
     *
     * @param integer $typeCards
     *
     * @return string
     */
    public function setTypeCards($typeCards)
    {
        $this->typeCards = $typeCards;

        return $this;
    }

    /**
     * Get typeCards
     *
     * @return string
     */
    public function getTypeCards()
    {
        return $this->typeCards;
    }


    /**
     * Set questionId
     *
     * @param integer $questionId
     *
     * @return Answers
     */
    public function setQuestionId($questionId)
    {
        $this->questionId = $questionId;

        return $this;
    }

    /**
     * Set secureEntryCheck
     *
     * @param boolean $secureEntryCheck
     *
     * @return Answers
     */
    public function setSecureEntryCheck($secureEntryCheck)
    {
        $this->secureEntryCheck = $secureEntryCheck;

        return $this;
    }

    /**
     * Get $secureEntryCheck
     *
     * @return boolean
     */
    public function getSecureEntryCheck()
    {
        return $this->secureEntryCheck;
    }

    /**
     * Set entryFeedCheck
     *
     * @param boolean $entryFeedCheck
     *
     * @return Answers
     */
    public function setEntryFeedCheck($entryFeedCheck)
    {
        $this->entryFeedCheck = $entryFeedCheck;

        return $this;
    }

    /**
     * Get entryFeedCheck
     *
     * @return boolean
     */
    public function getEntryFeedCheck()
    {
        return $this->entryFeedCheck;
    }
    
    /**
     * Set entryFeedDate
     *
     * @param \DateTime $entryFeedDate
     *
     * @return Answers
     */
    public function setEntryFeedDate($entryFeedDate)
    {
        $this->entryFeedDate = $entryFeedDate;

        return $this;
    }

    /**
     * Get entryFeedDate
     *
     * @return \DateTime
     */
    public function getEntryFeedDate()
    {
        return $this->entryFeedDate;
    }

    /**
     * Set actualUserCharge
     *
     * @param integer $actualUserCharge
     *
     * @return Answers
     */
    public function setActualUserCharge($actualUserCharge)
    {
        $this->actualUserCharge = $actualUserCharge;

        return $this;
    }

    /**
     * Get actualUserCharge
     *
     * @return integer
     */
    public function getActualUserCharge()
    {
        return $this->actualUserCharge;
    }
    
}
